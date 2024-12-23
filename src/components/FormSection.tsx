import { FormSection as FormSectionType } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormSectionProps {
  section: FormSectionType;
  values: any;
  onChange: (name: string, value: any) => void;
}

export const FormSection = ({ section, values, onChange }: FormSectionProps) => {
  return (
    <Card className="w-full mb-6 animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-primary">
          {section.title}
        </CardTitle>
        <p className="text-secondary text-sm">{section.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {section.fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>{field.label}</Label>
            {field.type === "select" ? (
              <Select
                value={values[field.name]}
                onValueChange={(value) => onChange(field.name, value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
                </SelectTrigger>
                <SelectContent>
                  {field.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <Input
                id={field.name}
                type={field.type}
                value={values[field.name] || ""}
                onChange={(e) => onChange(field.name, e.target.value)}
                className="w-full"
              />
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};