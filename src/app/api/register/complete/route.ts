import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const email = (body.email || "").toLowerCase().trim();
    const password: string = body.password || "";
    const personalInfo = body.personalInfo || {};
    const businessFlow: "existing" | "new" | null = body.businessFlow || null;
    const selectedBusinessId: string | null = body.selectedBusinessId || null;
    const businessInfo = body.businessInfo || {};

    if (!email || !password) {
      return NextResponse.json({ error: "email and password are required" }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const result = await prisma.$transaction(async (tx) => {
      let businessId: string;

      if (businessFlow === "existing") {
        if (!selectedBusinessId) throw new Error("selectedBusinessId is required for existing business flow");
        const existingBiz = await tx.business.findUnique({ where: { id: selectedBusinessId } });
        if (!existingBiz) throw new Error("Selected business not found");
        businessId = existingBiz.id;
      } else {
        const companyName: string = businessInfo.companyName || personalInfo.companyName || "New Business";
        const registrationNumber: string = businessInfo.registrationNumber || `REG-${Date.now()}`;
        const taxId: string = businessInfo.taxId || `TAX-${Date.now()}`;
        const country: string = businessInfo.country || "Unknown";
        const city: string = businessInfo.city || "Unknown";
        const address: string = businessInfo.address || "N/A";
        const industry: string | null = businessInfo.industry || null;

        const business = await tx.business.create({
          data: {
            businessName: companyName,
            legalName: companyName,
            businessType: "llc",
            industrySector: industry,
            businessDescription: null,

            registrationNumber,
            taxIdentificationNumber: taxId,
            vatNumber: null,
            incorporationDate: null,
            incorporationCountry: country,
            incorporationState: null,

            primaryAddress: address,
            city,
            stateProvince: null,
            postalCode: businessInfo.postalCode || "0000",
            country,

            primaryPhone: businessInfo.primaryPhone || "N/A",
            secondaryPhone: null,
            primaryEmail: businessInfo.primaryEmail || email,
            websiteUrl: null,

            employeeCount: null,
            annualRevenue: null,
            currency: "USD",
            establishedYear: null,

            primaryBankName: null,
            primaryAccountNumber: null,
            swiftCode: null,
            iban: null,
          },
          select: { id: true },
        });
        businessId = business.id;
      }

      // Ensure an OWNER role exists
      let role = await tx.userRole.findFirst({ where: { roleCode: "OWNER" } });
      if (!role) {
        role = await tx.userRole.create({
          data: {
            roleCode: "OWNER",
            roleName: "Owner",
            description: "Business owner",
            permissions: {},
            hierarchyLevel: 1,
          },
        });
      }

      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          username: null,
          firstName: personalInfo.firstName || "",
          lastName: personalInfo.lastName || "",
          personalPhone: personalInfo.phone || null,
          jobTitle: personalInfo.position || null,
          businessId,
          roleId: role.id,
        },
        select: { id: true },
      });

      // Mark draft as completed if exists
      await tx.registrationDraft.updateMany({
        where: { email },
        data: { completed: true, userId: user.id, businessId },
      });

      return { userId: user.id, businessId };
    });

    return NextResponse.json({ success: true, ...result });
  } catch (err: any) {
    console.error("Registration complete error:", err);
    return NextResponse.json({ error: err?.message || "Internal server error" }, { status: 500 });
  }
}
