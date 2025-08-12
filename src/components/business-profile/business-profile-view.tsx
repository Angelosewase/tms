"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Edit3,
  Save,
  X,
  Globe,
  MapPin,
  Phone,
  Mail,
  Building2,
  Shield,
  CheckCircle,
  AlertCircle,
  Clock,
  Loader2,
} from "lucide-react";
import BusinessEditForm from "@/components/business-profile/business-profile-form";

interface Business {
  id: string;
  businessName: string;
  primaryEmail: string;
  primaryPhone: string;
  websiteUrl: string | null;
  primaryAddress: string;
  city: string;
  postalCode: string;
  country: string;
  businessDescription: string | null;
  legalName: string;
  businessType: string;
  businessStatus: string;
  verificationStatus: string;
}

interface BusinessProfileViewProps {
  business: Business;
  updateAction: (formData: FormData) => Promise<void>;
}

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
    .substring(0, 2);
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
    case "verified":
      return <CheckCircle className="w-4 h-4" />;
    case "pending":
      return <Clock className="w-4 h-4" />;
    case "inactive":
    case "unverified":
      return <AlertCircle className="w-4 h-4" />;
    default:
      return <AlertCircle className="w-4 h-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
    case "verified":
      return "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-800";
    case "inactive":
    case "unverified":
      return "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-800";
    default:
      return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-900 dark:text-slate-200 dark:border-slate-700";
  }
};

export default function BusinessProfileView({
  business,
  updateAction,
}: BusinessProfileViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setError(null);
    setSuccess(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setError(null);
  };

  const handleSave = async (formData: FormData) => {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      try {
        await updateAction(formData);
        setSuccess(true);
        setIsEditing(false);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    });
  };

  if (isEditing) {
    return (
      <div className="space-y-6">
        {/* Edit Mode Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              Edit Business Profile
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mt-2">
              Update your business information and settings
            </p>
          </div>
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Cancel
          </Button>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <BusinessEditForm business={business} updateAction={handleSave} />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Success Message */}
      {success && (
        <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
          <CheckCircle className="w-4 h-4" />
          <AlertDescription>
            Business profile updated successfully!
          </AlertDescription>
        </Alert>
      )}

      {/* Main Profile Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Cpath d='M36 34V20h-8v14h-8v8h8v14h8v-14h8v-8h-8zM4 4h8v8H4V4zm0 16h8v8H4v-8zm0 16h8v8H4v-8zm16 0h8v8h-8v-8zm0-16h8v8h-8v-8zm0-16h8v8h-8V4zm16 0h8v8h-8V4zm0 16h8v8h-8v-8zm0 16h8v8h-8v-8z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <Card className="relative border-0 shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md">
          <CardContent className="p-0">
            <div className="p-8 lg:p-12">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
                <div className="flex flex-col lg:flex-row lg:items-start gap-8 flex-1">
                  {/* Business Avatar */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <div className="w-24 h-24 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
                        <span className="text-3xl font-bold text-white">
                          {getInitials(business.businessName)}
                        </span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 border-4 border-white dark:border-slate-900 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Business Info */}
                  <div className="flex-1 min-w-0 space-y-6">
                    <div className="space-y-4">
                      <div>
                        <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-200 dark:to-indigo-200 bg-clip-text text-transparent leading-tight">
                          {business.businessName}
                        </h1>
                        <p className="text-xl text-slate-600 dark:text-slate-400 mt-2 font-medium">
                          {business.legalName}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <Badge
                          className={`px-4 py-2 text-sm font-semibold shadow-lg border ${getStatusColor(
                            business.businessStatus
                          )}`}
                        >
                          <div className="flex items-center gap-2">
                            {getStatusIcon(business.businessStatus)}
                            {business.businessStatus}
                          </div>
                        </Badge>
                        <Badge
                          variant="outline"
                          className="px-4 py-2 text-sm font-semibold border-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm"
                        >
                          <Building2 className="w-4 h-4 mr-2" />
                          {business.businessType}
                        </Badge>
                        <Badge
                          className={`px-4 py-2 text-sm font-semibold shadow-lg border ${getStatusColor(
                            business.verificationStatus
                          )}`}
                        >
                          <div className="flex items-center gap-2">
                            <Shield className="w-4 h-4" />
                            {business.verificationStatus}
                          </div>
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="flex-shrink-0">
                  <Button
                    onClick={handleEdit}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6 py-3"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact Information */}
        <div className="lg:col-span-2">
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <Mail className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Email
                      </p>
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        {business.primaryEmail}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <Phone className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Phone
                      </p>
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        {business.primaryPhone}
                      </p>
                    </div>
                  </div>
                </div>

                {business.websiteUrl && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                      <Globe className="w-5 h-5 text-slate-500" />
                      <div>
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                          Website
                        </p>
                        <a
                          href={business.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-base font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                        >
                          {business.websiteUrl.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                    <MapPin className="w-5 h-5 text-slate-500" />
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                        Address
                      </p>
                      <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                        {business.primaryAddress}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {business.city}, {business.country}{" "}
                        {business.postalCode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {business.businessDescription && (
                <>
                  <Separator />
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                      About Our Business
                    </h3>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                      {business.businessDescription}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Business Status & Info */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                Business Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Status
                  </span>
                  <Badge
                    className={`${getStatusColor(
                      business.businessStatus
                    )} border`}
                  >
                    <div className="flex items-center gap-2">
                      {getStatusIcon(business.businessStatus)}
                      {business.businessStatus}
                    </div>
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Verification
                  </span>
                  <Badge
                    className={`${getStatusColor(
                      business.verificationStatus
                    )} border`}
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      {business.verificationStatus}
                    </div>
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                    Legal Name
                  </p>
                  <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {business.legalName}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
                    Business Type
                  </p>
                  <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
                    {business.businessType}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Card */}
          <Card className="shadow-lg border-0 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 border-indigo-100 dark:border-indigo-800">
            <CardContent className="pt-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 mx-auto bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center">
                  <Shield className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-indigo-900 dark:text-indigo-100">
                    Need Help?
                  </h3>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
                    Contact our support team if you need assistance with your
                    business profile.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
