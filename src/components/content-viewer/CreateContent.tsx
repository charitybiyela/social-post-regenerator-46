
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sparkles } from "lucide-react";

interface CreateContentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onContentCreate: (content: {
    id: number | string;
    title: string;
    content: string;
    author: string;
    timestamp: string;
    isAI: boolean;
    media?: {
      type: string;
      url?: string;
    }[];
    tags: string[];
  }) => void;
}

export const CreateContent: React.FC<CreateContentProps> = ({
  open,
  onOpenChange,
  onContentCreate,
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [mediaType, setMediaType] = useState<string | undefined>();
  const [mediaUrl, setMediaUrl] = useState("");
  const [tags, setTags] = useState("");

  const resetForm = () => {
    setTitle("");
    setContent("");
    setMediaType(undefined);
    setMediaUrl("");
    setTags("");
  };

  const handleCreate = () => {
    // Basic validation
    if (!title || !content) return;

    // Create content object
    const newContent = {
      id: Date.now(),
      title,
      content,
      author: "You",
      timestamp: new Date().toISOString(),
      isAI: false,
      tags: tags.split(",").map((tag) => tag.trim()).filter(Boolean),
      ...(mediaType && mediaUrl
        ? { media: [{ type: mediaType, url: mediaUrl }] }
        : {}),
    };

    // Pass to parent component
    onContentCreate(newContent);

    // Reset form
    resetForm();

    // Close dialog
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://avatar.vercel.sh/You.png" alt="Your profile" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-xl font-bold">
                <span className="text-gradient">Hey, what's vibing today?</span>
              </DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Share your thoughts, media, or just drop a vibe
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Give your vibe a catchy title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="content">Vibe Prompt</Label>
            <Textarea
              id="content"
              placeholder="What's on your mind? Share your thoughts, ideas, or stories..."
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="media-type">Media Type (Optional)</Label>
              <Select value={mediaType} onValueChange={setMediaType}>
                <SelectTrigger id="media-type">
                  <SelectValue placeholder="Select media type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="music">Music</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="twitter">Twitter</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="media-url">Media URL (Optional)</Label>
              <Input
                id="media-url"
                placeholder="Enter URL..."
                value={mediaUrl}
                onChange={(e) => setMediaUrl(e.target.value)}
                disabled={!mediaType}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="tags">Tags (Comma separated)</Label>
            <Input
              id="tags"
              placeholder="vibes, thoughts, life..."
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleCreate}
            className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Post Vibe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
