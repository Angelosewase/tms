import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Building2, MapPin, Users } from "lucide-react";

interface Business {
  id: string;
  name: string;
  industry: string;
  location: string;
  employees: string;
}

interface ExistingBusinessStepProps {
  businesses: Business[];
  selectedBusiness: string;
  onSelectBusiness: (businessId: string) => void;
}

export const ExistingBusinessStep = ({ 
  businesses, 
  selectedBusiness, 
  onSelectBusiness 
}: ExistingBusinessStepProps) => {
  const selected = businesses.find(b => b.id === selectedBusiness);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-foreground">Select Business</CardTitle>
        <CardDescription className="text-muted-foreground">
          Choose from your existing business profiles
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Business</label>
          <Select value={selectedBusiness} onValueChange={onSelectBusiness}>
            <SelectTrigger className="h-11">
              <SelectValue placeholder="Select a business" />
            </SelectTrigger>
            <SelectContent>
              {businesses.map((business) => (
                <SelectItem key={business.id} value={business.id}>
                  {business.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selected && (
          <div className="bg-accent/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="font-medium">{selected.name}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{selected.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{selected.employees} employees</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Industry: {selected.industry}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};