import { useState, useEffect } from "react";
import { Profile, FormSection } from "@/types/profile";
import { FormSection as FormSectionComponent } from "./FormSection";
import { ProfilePreview } from "./ProfilePreview";
import { saveProfile, loadProfile } from "@/utils/profileStorage";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const formSections: FormSection[] = [
  {
    title: "Demographics",
    description: "Basic information about yourself",
    fields: [
      { name: "age", label: "Age", type: "number" },
      { name: "country", label: "Country", type: "text" },
      { name: "region", label: "Region", type: "text" },
      { name: "gender", label: "Gender", type: "select", options: ["Male", "Female", "Other"] },
      { name: "race", label: "Race", type: "text" },
      { name: "ethnicity", label: "Ethnicity", type: "text" },
    ],
  },
  {
    title: "Professional Information",
    description: "Your career and education details",
    fields: [
      { name: "education", label: "Education Level", type: "select", options: [
        "High School", "Bachelor's", "Master's", "PhD", "Other"
      ]},
      { name: "occupation", label: "Occupation", type: "text" },
      { name: "income", label: "Income Range", type: "select", options: [
        "0-25,000", "25,001-50,000", "50,001-75,000", "75,001-100,000", "100,001+"
      ]},
    ],
  },
  {
    title: "Personal Preferences",
    description: "Your interests and characteristics",
    fields: [
      { name: "politicalLeaning", label: "Political Leaning", type: "select", options: [
        "Left", "Center-Left", "Center", "Center-Right", "Right"
      ]},
      { name: "interests", label: "Interests", type: "text" },
      { name: "hobbies", label: "Hobbies", type: "text" },
      { name: "personalityTraits", label: "Personality Traits", type: "text" },
      { name: "healthGoals", label: "Health Goals", type: "text" },
    ],
  },
];

export const ProfileForm = () => {
  const [profile, setProfile] = useState<Partial<Profile>>({});
  const { toast } = useToast();

  useEffect(() => {
    const savedProfile = loadProfile();
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const handleChange = (name: keyof Profile, value: any) => {
    setProfile((prev) => {
      const updated = { ...prev, [name]: value };
      saveProfile(updated as Profile);
      return updated;
    });
  };

  const handleSave = () => {
    saveProfile(profile as Profile);
    toast({
      title: "Profile Saved",
      description: "Your profile has been saved successfully.",
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-primary mb-8 text-center">
        Personal Profile Builder
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          {formSections.map((section, index) => (
            <FormSectionComponent
              key={index}
              section={section}
              values={profile}
              onChange={handleChange}
            />
          ))}
          <Button onClick={handleSave} className="w-full bg-accent hover:bg-accent/90">
            Save Profile
          </Button>
        </div>
        <div className="lg:sticky lg:top-8 h-fit">
          <ProfilePreview profile={profile} />
        </div>
      </div>
    </div>
  );
};