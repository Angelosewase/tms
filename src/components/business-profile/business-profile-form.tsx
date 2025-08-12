"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, Save, Building2 } from "lucide-react";

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

interface BusinessProfileFormProps {
  business: Business;
  updateAction: (formData: FormData) => Promise<void>;
}

export default function BusinessProfileForm({ business, updateAction }: BusinessProfileFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    setSuccess(false);
    
    startTransition(async () => {
      try {
        await updateAction(formData);
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    });
  };

  return (
    <Card className=" border-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <Building2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <CardTitle className="text-2xl">Business Information</CardTitle>
            <CardDescription>
              Update your business profile information
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200">
            <AlertDescription>Business profile updated successfully!</AlertDescription>
          </Alert>
        )}

        <form action={handleSubmit} className="space-y-6">
          <input type="hidden" name="businessId" defaultValue={business.id} />

          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-sm font-medium">
              Business Name *
            </Label>
            <Input
              id="businessName"
              name="businessName"
              defaultValue={business.businessName}
              className="h-12 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="primaryEmail" className="text-sm font-medium">
                Primary Email *
              </Label>
              <Input
                id="primaryEmail"
                name="primaryEmail"
                type="email"
                defaultValue={business.primaryEmail}
                className="h-12 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="primaryPhone" className="text-sm font-medium">
                Primary Phone *
              </Label>
              <Input
                id="primaryPhone"
                name="primaryPhone"
                defaultValue={business.primaryPhone}
                className="h-12 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="websiteUrl" className="text-sm font-medium">
                Website
              </Label>
              <Input
                id="websiteUrl"
                name="websiteUrl"
                type="url"
                defaultValue={business.websiteUrl ?? ""}
                placeholder="https://example.com"
                className="h-12 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="country" className="text-sm font-medium">
                Country *
              </Label>
              <Input
                id="country"
                name="country"
                defaultValue={business.country}
                className="h-12 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city" className="text-sm font-medium">
                City *
              </Label>
              <Input
                id="city"
                name="city"
                defaultValue={business.city}
                className="h-12 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="postalCode" className="text-sm font-medium">
                Postal Code *
              </Label>
              <Input
                id="postalCode"
                name="postalCode"
                defaultValue={business.postalCode}
                className="h-12 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="primaryAddress" className="text-sm font-medium">
                Address *
              </Label>
              <Input
                id="primaryAddress"
                name="primaryAddress"
                defaultValue={business.primaryAddress}
                className="h-12 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessDescription" className="text-sm font-medium">
              Business Description
            </Label>
            <Textarea
              id="businessDescription"
              name="businessDescription"
              defaultValue={business.businessDescription ?? ""}
              placeholder="Describe your business, services, and what makes you unique..."
              className="min-h-[120px] border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 resize-none"
              rows={5}
            />
          </div>

          <div className="pt-4">
            <Button
              type="submit"
              disabled={isPending}
              className="w-full md:w-auto h-12 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}