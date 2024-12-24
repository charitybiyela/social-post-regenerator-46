import React from 'react';
import { Activity, BarChart2, Settings, Film, Coffee, MapPin } from 'lucide-react';
import { usePersonalization } from '@/contexts/PersonalizationContext';
import { Card } from '@/components/ui/card';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp } from 'lucide-react';

const CategoryIcon = ({ category }: { category: string }) => {
  const icons = {
    sports: Activity,
    finance: BarChart2,
    technology: Settings,
    entertainment: Film,
    lifestyle: Coffee,
    regions: MapPin,
  };
  
  const Icon = icons[category as keyof typeof icons] || MapPin;
  return <Icon className="w-4 h-4" />;
};

export const PersonalizationPanel = () => {
  const { userInterests, updateInterest } = usePersonalization();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Card className="p-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Personalize Your Feed</h3>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm">
              {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent>
          <div className="space-y-4">
            {Object.entries(userInterests).map(([category, interests]) => (
              <div key={category} className="space-y-2">
                <div className="flex items-center gap-2">
                  <CategoryIcon category={category} />
                  <h4 className="font-medium capitalize">{category}</h4>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(interests).map(([interest, isEnabled]) => (
                    <button
                      key={interest}
                      onClick={() => updateInterest(category as keyof typeof userInterests, interest, !isEnabled)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        isEnabled 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-secondary-foreground'
                      }`}
                    >
                      {interest.replace(/-/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
};