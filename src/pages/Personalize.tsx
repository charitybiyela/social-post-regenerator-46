import { ProfileForm } from "@/components/ProfileForm";
import { PersonalizationPanel } from "@/components/PersonalizationPanel";
import ProfileDashboard from "@/components/ProfileDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export default function Personalize() {
  const { toast } = useToast();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf' || 
          selectedFile.type === 'application/msword' || 
          selectedFile.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setFile(selectedFile);
        toast({
          title: "Resume selected",
          description: `File "${selectedFile.name}" is ready to be uploaded.`,
        });
      } else {
        toast({
          title: "Invalid file type",
          description: "Please upload a PDF or Word document.",
          variant: "destructive",
        });
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    
    toast({
      title: "Resume uploaded successfully",
      description: "We'll analyze your interests and update your feed preferences.",
    });
    setFile(null);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Customize Your News Feed</h1>
      <p className="text-muted-foreground text-center mb-8">
        Select your interests and emotional state below to personalize your news experience. 
        Your feed will update in real-time as you make selections.
      </p>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload Resume
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Upload your resume to help us better understand your interests and provide more relevant content.
            We accept PDF and Word documents.
          </p>
          <div className="space-y-2">
            <Label htmlFor="resume">Resume</Label>
            <Input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>
          {file && (
            <Button 
              onClick={handleUpload}
              className="w-full"
            >
              Upload Resume
            </Button>
          )}
        </CardContent>
      </Card>

      <div className="space-y-8">
        <ProfileDashboard />
        <ProfileForm />
        <PersonalizationPanel />
      </div>
    </div>
  );
}