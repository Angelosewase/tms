import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { Suspense } from "react";
import BusinessProfileView from "@/components/business-profile/business-profile-view";
import LoadingSkeleton from "@/components/common/loading-skeleton";

export const metadata = {
  title: "Business Profile",
  description: "Manage your business profile and information",
};

// Server action for updating business
async function updateBusiness(formData: FormData) {
  "use server";

  const businessId = formData.get("businessId") as string;
  const businessName = (formData.get("businessName") as string)?.trim();
  const primaryEmail = (formData.get("primaryEmail") as string)?.trim();
  const primaryPhone = (formData.get("primaryPhone") as string)?.trim();
  const websiteUrl = (formData.get("websiteUrl") as string)?.trim() || null;
  const primaryAddress = (formData.get("primaryAddress") as string)?.trim();
  const city = (formData.get("city") as string)?.trim();
  const postalCode = (formData.get("postalCode") as string)?.trim();
  const country = (formData.get("country") as string)?.trim();
  const businessDescription =
    (formData.get("businessDescription") as string)?.trim() || null;

  if (
    !businessId ||
    !businessName ||
    !primaryEmail ||
    !primaryPhone ||
    !primaryAddress ||
    !city ||
    !postalCode ||
    !country
  ) {
    throw new Error("Missing required fields");
  }

  await prisma.business.update({
    where: { id: businessId },
    data: {
      businessName,
      primaryEmail,
      primaryPhone,
      websiteUrl,
      primaryAddress,
      city,
      postalCode,
      country,
      businessDescription,
    },
  });

  revalidatePath("/(protected)/admin/business-profile");
}

export default async function BusinessProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { business: true },
  });

  if (!user?.business) {
    return (
      <div className=" bg-white dark:from-slate-950 dark:to-slate-900">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-slate-200 dark:bg-slate-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                No Business Profile Found
              </h1>
              <p className="text-slate-600 dark:text-slate-400">
                You don't have a business profile associated with your account
                yet.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<LoadingSkeleton />}>
            <BusinessProfileView
              business={user.business}
              updateAction={updateBusiness}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
