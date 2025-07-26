"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ProgressSteps } from "./progress-steps";
import { PersonalInfoStep } from "./personal-info-step";
import { BusinessSelectionStep } from "./business-selection-step";
import { ExistingBusinessStep } from "./existing-business-step";
import { NewBusinessStep } from "./new-business-step";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
}

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

// Mock existing businesses
const mockBusinesses = [
  {
    id: "1",
    name: "Tech Solutions Inc.",
    industry: "Technology",
    location: "San Francisco, CA",
    employees: "50-100",
  },
  {
    id: "2",
    name: "Global Consulting LLC",
    industry: "Consulting",
    location: "New York, NY",
    employees: "100-200",
  },
];

export const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [businessFlow, setBusinessFlow] = useState<"existing" | "new" | null>(
    null
  );

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    position: "",
  });

  const [businessInfo, setBusinessInfo] = useState<BusinessInfo>({
    companyName: "",
    industry: "",
    registrationNumber: "",
    taxId: "",
    address: "",
    city: "",
    country: "",
    employeeCount: "",
  });

  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [personalErrors, setPersonalErrors] = useState<Partial<PersonalInfo>>(
    {}
  );
  const [businessErrors, setBusinessErrors] = useState<Partial<BusinessInfo>>(
    {}
  );

  const stepLabels =
    businessFlow === "existing"
      ? ["Personal Info", "Business Type", "Select Business"]
      : businessFlow === "new"
      ? ["Personal Info", "Business Type", "Create Business"]
      : ["Personal Info", "Business Type", "Business Setup"];

  const totalSteps = 3;

  const validatePersonalInfo = (): boolean => {
    const errors: Partial<PersonalInfo> = {};

    if (!personalInfo.firstName.trim())
      errors.firstName = "First name is required";
    if (!personalInfo.lastName.trim())
      errors.lastName = "Last name is required";
    if (!personalInfo.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(personalInfo.email))
      errors.email = "Email is invalid";
    if (!personalInfo.phone.trim()) errors.phone = "Phone number is required";
    if (!personalInfo.position.trim()) errors.position = "Position is required";

    setPersonalErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateBusinessInfo = (): boolean => {
    if (businessFlow === "existing") {
      return selectedBusiness !== "";
    }

    const errors: Partial<BusinessInfo> = {};

    if (!businessInfo.companyName.trim())
      errors.companyName = "Company name is required";
    if (!businessInfo.industry.trim()) errors.industry = "Industry is required";
    if (!businessInfo.registrationNumber.trim())
      errors.registrationNumber = "Registration number is required";
    if (!businessInfo.taxId.trim()) errors.taxId = "Tax ID is required";
    if (!businessInfo.address.trim()) errors.address = "Address is required";
    if (!businessInfo.city.trim()) errors.city = "City is required";
    if (!businessInfo.country.trim()) errors.country = "Country is required";
    if (!businessInfo.employeeCount.trim())
      errors.employeeCount = "Employee count is required";

    setBusinessErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validatePersonalInfo()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (businessFlow) {
        setCurrentStep(3);
      }
    } else if (currentStep === 3) {
      if (validateBusinessInfo()) {
        handleSubmit();
      }
    }
  };

  const handleBack = () => {
    if (currentStep === 3 && businessFlow) {
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setCurrentStep(1);
      setBusinessFlow(null);
    }
  };

  const handleSubmit = () => {
    console.log("Registration data:", {
      personalInfo,
      businessFlow,
      businessInfo:
        businessFlow === "new" ? businessInfo : { selectedBusiness },
    });
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            data={personalInfo}
            onChange={setPersonalInfo}
            errors={personalErrors}
          />
        );
      case 2:
        return (
          <BusinessSelectionStep
            onSelectExisting={() => setBusinessFlow("existing")}
            onCreateNew={() => setBusinessFlow("new")}
          />
        );
      case 3:
        if (businessFlow === "existing") {
          return (
            <ExistingBusinessStep
              businesses={mockBusinesses}
              selectedBusiness={selectedBusiness}
              onSelectBusiness={setSelectedBusiness}
            />
          );
        } else if (businessFlow === "new") {
          return (
            <NewBusinessStep
              data={businessInfo}
              onChange={setBusinessInfo}
              errors={businessErrors}
            />
          );
        }
        return null;
      default:
        return null;
    }
  };

  const canProceed = () => {
    if (currentStep === 2) return businessFlow !== null;
    if (currentStep === 3 && businessFlow === "existing")
      return selectedBusiness !== "";
    return true;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Join Tender Management Platform
          </h1>
          <p className="text-muted-foreground">
            Create your account to start participating in tenders
          </p>
        </div>

        <ProgressSteps
          currentStep={currentStep}
          totalSteps={totalSteps}
          stepLabels={stepLabels}
        />

        {renderCurrentStep()}

        <div className="flex justify-between mt-8 max-w-md mx-auto">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="min-w-24"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="min-w-24"
          >
            {currentStep === totalSteps ? (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
