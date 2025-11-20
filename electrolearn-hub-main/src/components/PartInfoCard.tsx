import { Button } from "@/components/ui/button";
import { ExternalLink, X } from "lucide-react";

interface PartInfoCardProps {
  name: string;
  description: string;
  datasheetLink?: string;
  onClose: () => void;
}

/**
 * PartInfoCard - Displays information about a selected part/hotspot
 * Shows on the right side when a hotspot is clicked
 */
const PartInfoCard = ({ name, description, datasheetLink, onClose }: PartInfoCardProps) => {
  return (
    <div className="rounded-xl shadow-lg p-4 bg-card sticky top-4">
      {/* Header with close button */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl font-bold text-foreground">Part Information</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="h-8 w-8"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Part Name */}
      <div className="mb-4">
        <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
          Selected Part
        </div>
        <h4 className="text-lg font-bold text-foreground mb-2">{name}</h4>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>

      {/* Datasheet Link */}
      {datasheetLink && datasheetLink !== "#" && (
        <div className="pt-4 border-t border-border">
          <a
            href={datasheetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="text-sm font-medium">View Datasheet</span>
          </a>
        </div>
      )}
    </div>
  );
};

export default PartInfoCard;

