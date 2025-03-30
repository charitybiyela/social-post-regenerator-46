
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface CreateContentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContentCreate: (content: any) => void;
}

export const CreateContent: React.FC<CreateContentProps> = ({ 
  open, 
  onOpenChange,
  onContentCreate
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaType, setMediaType] = useState<string>("website");
  const [mediaUrl, setMediaUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast.error("Please provide a title");
      return;
    }
    
    // Create the new content object
    const newContent = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      author: "You",
      isAI: false,
      timestamp: new Date().toLocaleString(),
      media: mediaUrl ? [{ type: mediaType, url: mediaUrl.trim() }] : undefined,
      tags: ["user-created"]
    };
    
    // Pass the new content to parent
    onContentCreate(newContent);
    
    // Reset form and close dialog
    resetForm();
    onOpenChange(false);
    
    toast.success("Content created successfully");
  };
  
  const resetForm = () => {
    setTitle("");
    setContent("");
    setMediaType("website");
    setMediaUrl("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Content</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter a title"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea 
              id="content" 
              value={content} 
              onChange={(e) => setContent(e.target.value)} 
              placeholder="Enter content details"
              className="min-h-[100px]"
            />
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Media Type</Label>
              <Select value={mediaType} onValueChange={setMediaType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2 col-span-2">
              <Label htmlFor="mediaUrl">URL</Label>
              <Input 
                id="mediaUrl" 
                value={mediaUrl} 
                onChange={(e) => setMediaUrl(e.target.value)} 
                placeholder={mediaType === "website" ? "https://..." : "Media URL"}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
