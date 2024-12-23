import { Profile } from "@/types/profile";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfilePreviewProps {
  profile: Partial<Profile>;
}

export const ProfilePreview = ({ profile }: ProfilePreviewProps) => {
  return (
    <Card className="w-full bg-white shadow-lg animate-fadeIn">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-primary">Profile Preview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(profile).map(([key, value]) => (
          <div key={key} className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-secondary capitalize">
              {key.replace(/([A-Z])/g, " $1").trim()}
            </span>
            <span className="text-foreground">
              {Array.isArray(value) ? value.join(", ") : value}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};