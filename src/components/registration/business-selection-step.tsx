import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Plus } from "lucide-react";

interface BusinessSelectionStepProps {
  onSelectExisting: () => void;
  onCreateNew: () => void;
}

export const BusinessSelectionStep = ({ onSelectExisting, onCreateNew }: BusinessSelectionStepProps) => {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-foreground">Business Setup</CardTitle>
        <CardDescription className="text-muted-foreground">
          Do you have an existing business or would you like to create a new one?
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button
          variant="outline"
          size="lg"
          className="w-full h-20 flex flex-col gap-2 border-2 hover:border-primary hover:bg-accent transition-all duration-200"
          onClick={onSelectExisting}
        >
          <Building2 className="w-6 h-6 text-primary" />
          <div className="text-center">
            <div className="font-medium">Select Existing Business</div>
            <div className="text-sm text-muted-foreground">Choose from your registered businesses</div>
          </div>
        </Button>
        
        <Button
          variant="outline"
          size="lg"
          className="w-full h-20 flex flex-col gap-2 border-2 hover:border-primary hover:bg-accent transition-all duration-200"
          onClick={onCreateNew}
        >
          <Plus className="w-6 h-6 text-primary" />
          <div className="text-center">
            <div className="font-medium">Create New Business</div>
            <div className="text-sm text-muted-foreground">Register a new business profile</div>
          </div>
        </Button>
      </CardContent>
    </Card>
  );
};