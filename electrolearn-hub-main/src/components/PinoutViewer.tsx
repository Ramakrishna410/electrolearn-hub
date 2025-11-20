import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface PinoutViewerProps {
  imageSrc: string;
  alt?: string;
}

/**
 * PinoutViewer - Displays a pinout image with zoom controls
 * Features zoom-in, zoom-out, and reset functionality
 * Includes border, shadow, and responsive sizing
 */
const PinoutViewer = ({ imageSrc, alt = "Pinout Diagram" }: PinoutViewerProps) => {
  const [scale, setScale] = useState(1);
  const minScale = 0.5;
  const maxScale = 3;
  const scaleStep = 0.25;

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + scaleStep, maxScale));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - scaleStep, minScale));
  };

  const handleReset = () => {
    setScale(1);
  };

  return (
    <div className="rounded-xl shadow-lg p-4 bg-card overflow-hidden">
      <div className="relative bg-secondary/30 rounded-lg overflow-auto max-h-[800px]">
        {/* Zoom Controls */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleZoomOut}
            disabled={scale <= minScale}
            className="h-9 w-9 shadow-md"
            aria-label="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleReset}
            className="h-9 w-9 shadow-md"
            aria-label="Reset Zoom"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={handleZoomIn}
            disabled={scale >= maxScale}
            className="h-9 w-9 shadow-md"
            aria-label="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        {/* Image Container */}
        <div className="flex items-center justify-center p-6 min-h-[400px]">
          <img
            src={imageSrc}
            alt={alt}
            className="transition-transform duration-300 ease-in-out max-w-full h-auto"
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center center",
            }}
            onError={(e) => {
              // Fallback if image doesn't exist
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
        </div>

        {/* Zoom Indicator */}
        <div className="absolute bottom-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-md text-sm font-medium text-foreground shadow-md">
          {Math.round(scale * 100)}%
        </div>
      </div>
    </div>
  );
};

export default PinoutViewer;

