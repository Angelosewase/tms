import { FormInput } from "./form-input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface BusinessInfo {
  companyName: string;
  industry: string;
  registrationNumber: string;
  taxId: string;
  address: string;
  city: string;
  country: string;
  employeeCount: string;
}

interface NewBusinessStepProps {
  data: BusinessInfo;
  onChange: (data: BusinessInfo) => void;
  errors: Partial<BusinessInfo>;
}

const industries = [
  "Technology",
  "Healthcare",
  "Finance",
  "Manufacturing",
  "Construction",
  "Retail",
  "Education",
  "Transportation",
  "Energy",
  "Other",
];

const employeeCounts = ["1-10", "11-50", "51-200", "201-500", "500+"];

export const NewBusinessStep = ({
  data,
  onChange,
  errors,
}: NewBusinessStepProps) => {
  const updateField = (field: keyof BusinessInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card className="w-full max-w-md lg:max-w-2xl mx-auto">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-foreground">
          Create New Business
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Register your business profile for tender submissions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormInput
          id="companyName"
          label="Company Name"
          placeholder="ABC Corporation Ltd."
          value={data.companyName}
          onChange={(value: string) => updateField("companyName", value)}
          required
          error={errors.companyName}
        />

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Industry <span className="text-primary ml-1">*</span>
          </Label>
          <Select
            value={data.industry}
            onValueChange={(value: string) => updateField("industry", value)}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.industry && (
            <p className="text-sm text-destructive">{errors.industry}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="registrationNumber"
            label="Registration No."
            placeholder="REG123456"
            value={data.registrationNumber}
            onChange={(value: string) =>
              updateField("registrationNumber", value)
            }
            error={errors.registrationNumber}
          />
          <FormInput
            id="taxId"
            label="Tax ID"
            placeholder="TAX789012"
            value={data.taxId}
            onChange={(value: string) => updateField("taxId", value)}
            error={errors.taxId}
          />
        </div>

        <FormInput
          id="address"
          label="Business Address"
          placeholder="123 Business Street"
          value={data.address}
          onChange={(value: string) => updateField("address", value)}
          error={errors.address}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="city"
            label="City"
            placeholder="New York"
            value={data.city}
            onChange={(value: string) => updateField("city", value)}
            error={errors.city}
          />
          <FormInput
            id="country"
            label="Country"
            placeholder="United States"
            value={data.country}
            onChange={(value: string) => updateField("country", value)}
            error={errors.country}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Number of Employees <span className="text-primary ml-1">*</span>
          </Label>
          <Select
            value={data.employeeCount}
            onValueChange={(value) => updateField("employeeCount", value)}
          >
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select employee count" />
            </SelectTrigger>
            <SelectContent>
              {employeeCounts.map((count) => (
                <SelectItem key={count} value={count}>
                  {count}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.employeeCount && (
            <p className="text-sm text-destructive">{errors.employeeCount}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
