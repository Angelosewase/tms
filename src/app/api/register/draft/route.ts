import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = (searchParams.get("email") || "").toLowerCase().trim();
  if (!email) return NextResponse.json({ error: "email is required" }, { status: 400 });

  const draft = await prisma.registrationDraft.findUnique({ where: { email } });
  return NextResponse.json({ draft });
}

export async function POST(req: Request) {
  const body = await req.json();
  const email = (body.email || "").toLowerCase().trim();
  if (!email) return NextResponse.json({ error: "email is required" }, { status: 400 });

  const draft = await prisma.registrationDraft.upsert({
    where: { email },
    update: {
      step: body.step ?? undefined,
      businessFlow: body.businessFlow ?? undefined,
      personalInfo: body.personalInfo ?? undefined,
      businessInfo: body.businessInfo ?? undefined,
      selectedBusinessId: body.selectedBusinessId ?? undefined,
      completed: body.completed ?? undefined,
    },
    create: {
      email,
      step: body.step ?? 1,
      businessFlow: body.businessFlow ?? null,
      personalInfo: body.personalInfo ?? null,
      businessInfo: body.businessInfo ?? null,
      selectedBusinessId: body.selectedBusinessId ?? null,
    },
  });

  return NextResponse.json({ draft });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const email = (body.email || "").toLowerCase().trim();
  if (!email) return NextResponse.json({ error: "email is required" }, { status: 400 });

  const draft = await prisma.registrationDraft.update({
    where: { email },
    data: {
      step: body.step ?? undefined,
      businessFlow: body.businessFlow ?? undefined,
      personalInfo: body.personalInfo ?? undefined,
      businessInfo: body.businessInfo ?? undefined,
      selectedBusinessId: body.selectedBusinessId ?? undefined,
      completed: body.completed ?? undefined,
    },
  });

  return NextResponse.json({ draft });
}
