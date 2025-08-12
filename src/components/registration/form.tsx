"use client";

import { useCallback, useEffect, useRef, useState } from "react";
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
  password: string;
  confirmPassword: string;
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
    password: "",
    confirmPassword: "",
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

  const savingRef = useRef(false);
  const localStorageKey = "registrationDraft";

  const saveDraftLocal = useCallback(() => {
    try {
      const draft = {
        step: currentStep,
        businessFlow,
        personalInfo,
        businessInfo,
        selectedBusiness,
      };
      localStorage.setItem(localStorageKey, JSON.stringify(draft));
    } catch (_) {}
  }, [currentStep, businessFlow, personalInfo, businessInfo, selectedBusiness]);

  const saveDraftServer = useCallback(async () => {
    if (!personalInfo.email || savingRef.current) return;
    savingRef.current = true;
    try {
      await fetch("/api/register/draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: personalInfo.email,
          step: currentStep,
          businessFlow,
          personalInfo,
          businessInfo,
          selectedBusinessId:
            businessFlow === "existing" ? selectedBusiness : null,
        }),
      });
    } catch (_) {
      // ignore
    } finally {
      savingRef.current = false;
    }
  }, [
    personalInfo.email,
    currentStep,
    businessFlow,
    personalInfo,
    businessInfo,
    selectedBusiness,
  ]);

  // Load draft on mount (server by email param, else local)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const emailParam = (params.get("email") || "").toLowerCase().trim();
    const load = async () => {
      try {
        const local = localStorage.getItem(localStorageKey);
        const localDraft = local ? JSON.parse(local) : null;
        const localEmail = (localDraft?.personalInfo?.email || "")
          .toLowerCase()
          .trim();

        const targetEmail = emailParam || localEmail;
        if (targetEmail) {
          const res = await fetch(
            `/api/register/draft?email=${encodeURIComponent(targetEmail)}`
          );
          const json = await res.json();
          if (json?.draft) {
            const d = json.draft;
            setCurrentStep(d.step || 1);
            setBusinessFlow(d.businessFlow ?? null);
            if (d.personalInfo)
              setPersonalInfo((p) => ({ ...p, ...d.personalInfo }));
            if (d.businessInfo)
              setBusinessInfo((b) => ({ ...b, ...d.businessInfo }));
            if (d.selectedBusinessId) setSelectedBusiness(d.selectedBusinessId);
            return;
          }
          localStorage.removeItem(localStorageKey);
          return;
        }

        if (!targetEmail && localDraft) {
          const d = localDraft;
          if (d.step) setCurrentStep(d.step);
          if (d.businessFlow !== undefined) setBusinessFlow(d.businessFlow);
          if (d.personalInfo)
            setPersonalInfo((p) => ({ ...p, ...d.personalInfo }));
          if (d.businessInfo)
            setBusinessInfo((b) => ({ ...b, ...d.businessInfo }));
          if (d.selectedBusiness) setSelectedBusiness(d.selectedBusiness);
        }
      } catch (_) {}
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    saveDraftLocal();
    const t = setTimeout(() => {
      saveDraftServer();
    }, 400);
    return () => clearTimeout(t);
  }, [saveDraftLocal, saveDraftServer]);

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
    if (!personalInfo.password.trim()) errors.password = "Password is required";
    else if (personalInfo.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (!personalInfo.confirmPassword.trim())
      errors.confirmPassword = "Please confirm your password";
    else if (personalInfo.password !== personalInfo.confirmPassword)
      errors.confirmPassword = "Passwords do not match";

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
    const run = async () => {
      try {
        const res = await fetch("/api/register/complete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: personalInfo.email,
            password: personalInfo.password,
            personalInfo,
            businessFlow,
            selectedBusinessId:
              businessFlow === "existing" ? selectedBusiness : null,
            businessInfo: businessFlow === "new" ? businessInfo : null,
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json?.error || "Registration failed");
        // Clear local draft
        localStorage.removeItem(localStorageKey);
        // Redirect to login or dashboard
        window.location.href = "/login";
      } catch (e) {
        console.error(e);
        alert((e as Error).message);
      }
    };
    run();
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
            Join Tendra
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

        <div className="flex justify-between mt-8 max-w-md lg:max-w-2xl mx-auto">
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
