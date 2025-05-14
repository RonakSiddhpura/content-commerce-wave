
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface AnnouncementBarProps {
  message: string;
  link?: {
    text: string;
    url: string;
  };
  backgroundColor?: string;
  textColor?: string;
  enabled?: boolean;
}

const AnnouncementBar = ({
  message,
  link,
  backgroundColor = "bg-brand",
  textColor = "text-white",
  enabled = true,
}: AnnouncementBarProps) => {
  const [isVisible, setIsVisible] = useState(true);
  
  // Don't render if disabled
  if (!enabled) return null;

  return (
    <div
      className={cn(
        "relative py-2 px-4 text-center text-sm font-medium transition-all",
        isVisible ? "block" : "hidden",
        backgroundColor,
        textColor
      )}
    >
      <div className="container flex items-center justify-center">
        <p className="flex-1 text-center">
          {message}
          {link && (
            <a
              href={link.url}
              className="ml-2 underline underline-offset-2 hover:opacity-90"
            >
              {link.text}
            </a>
          )}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className={cn("text-current hover:bg-transparent hover:opacity-80")}
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </div>
    </div>
  );
};

export default AnnouncementBar;
