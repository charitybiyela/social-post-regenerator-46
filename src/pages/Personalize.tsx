import { PersonalizationPanel } from "@/components/PersonalizationPanel";

export default function Personalize() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Customize Your News Feed</h1>
      <p className="text-muted-foreground text-center mb-8">
        Select your interests below to personalize your news experience. 
        Your feed will update in real-time as you make selections.
      </p>
      <PersonalizationPanel />
    </div>
  );
}