import { FormInput } from "./form-input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
}

interface PersonalInfoStepProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  errors: Partial<PersonalInfo>;
}

export const PersonalInfoStep = ({ data, onChange, errors }: PersonalInfoStepProps) => {
  const updateField = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-foreground">Personal Information</CardTitle>
        <CardDescription className="text-muted-foreground">
          Let's start with your basic information
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            id="firstName"
            label="First Name"
            placeholder="John"
            value={data.firstName}
            onChange={(value) => updateField("firstName", value)}
            required
            error={errors.firstName}
          />
          <FormInput
            id="lastName"
            label="Last Name"
            placeholder="Doe"
            value={data.lastName}
            onChange={(value) => updateField("lastName", value)}
            required
            error={errors.lastName}
          />
        </div>
        <FormInput
          id="email"
          label="Email Address"
          type="email"
          placeholder="john.doe@example.com"
          value={data.email}
          onChange={(value) => updateField("email", value)}
          required
          error={errors.email}
        />
        <FormInput
          id="phone"
          label="Phone Number"
          type="tel"
          placeholder="+1 (555) 123-4567"
          value={data.phone}
          onChange={(value) => updateField("phone", value)}
          required
          error={errors.phone}
        />
        <FormInput
          id="position"
          label="Job Position"
          placeholder="Business Manager"
          value={data.position}
          onChange={(value) => updateField("position", value)}
          required
          error={errors.position}
        />
      </CardContent>
    </Card>
  );
};