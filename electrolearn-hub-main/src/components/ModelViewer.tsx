import { useState, useEffect, useRef } from "react";
import PartInfoCard from "@/components/PartInfoCard";
import { Hotspot } from "@/types/device";

interface ModelViewerProps {
  src: string;
  alt?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  hotspots?: Hotspot[];
}

/**
 * ModelViewer - Displays a 3D model with interactive hotspots
 * Click on hotspots to see information about different parts
 */
const ModelViewer = ({ 
  src, 
  alt = "3D Model", 
  autoRotate = true, 
  cameraControls = true,
  hotspots = []
}: ModelViewerProps) => {
  // State to track the selected hotspot
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const modelViewerRef = useRef<any>(null);

  // Set up click handlers for hotspots after the model loads
  useEffect(() => {
    const modelViewer = modelViewerRef.current;
    if (!modelViewer || hotspots.length === 0) return;

    // Function to handle hotspot clicks
    const handleHotspotClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const hotspotSlot = target.getAttribute('data-hotspot-slot');
      
      if (hotspotSlot) {
        // Find the hotspot data from our hotspots array
        const clickedHotspot = hotspots.find(h => h.slotName === hotspotSlot);
        if (clickedHotspot) {
          setSelectedHotspot(clickedHotspot);
        }
      }
    };

    // Wait for the model to load, then attach click listeners
    const handleLoad = () => {
      // Attach click listeners to all hotspot buttons
      const hotspotElements = modelViewer.querySelectorAll('button[slot^="hotspot-"]');
      hotspotElements.forEach((element: HTMLElement) => {
        element.addEventListener('click', handleHotspotClick);
      });
    };

    // Store cleanup function for event listeners
    const cleanup = () => {
      const hotspotElements = modelViewer.querySelectorAll('button[slot^="hotspot-"]');
      hotspotElements.forEach((element: HTMLElement) => {
        element.removeEventListener('click', handleHotspotClick);
      });
    };

    modelViewer.addEventListener('load', handleLoad);

    // Cleanup: remove event listeners when component unmounts or hotspots change
    return () => {
      if (modelViewer) {
        modelViewer.removeEventListener('load', handleLoad);
        cleanup();
      }
    };
  }, [hotspots]);

  // Function to close the info card
  const handleCloseCard = () => {
    setSelectedHotspot(null);
  };

  return (
    <div className="w-full">
      {/* 3D Model Viewer */}
      <div className="rounded-xl shadow-lg p-4 bg-card overflow-hidden">
        <model-viewer
          ref={modelViewerRef}
          src={src}
          alt={alt}
          auto-rotate={autoRotate}
          camera-controls={cameraControls}
          shadow-intensity="1"
          style={{
            width: '100%',
            height: '500px',
            background: 'hsl(var(--secondary))',
          }}
        >
          {/* Create hotspot buttons for each hotspot in the array */}
          {hotspots.map((hotspot) => (
            <button
              key={hotspot.slotName}
              slot={hotspot.slotName}
              data-hotspot-slot={hotspot.slotName}
              data-position={`${hotspot.x}m ${hotspot.y}m ${hotspot.z}m`}
              data-normal="0m 1m 0m"
              className="hotspot-button"
            >
              <div className="hotspot-label">
                {hotspot.label}
              </div>
            </button>
          ))}

          {/* Loading indicator shown while model is loading */}
          <div className="loading-indicator" slot="poster">
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </div>
        </model-viewer>

        {/* Styles for hotspot buttons */}
        <style>{`
          .hotspot-button {
            display: block;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            border: 3px solid hsl(var(--primary));
            background: hsl(var(--background));
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            cursor: pointer;
            transition: all 0.2s ease;
            position: relative;
          }

          .hotspot-button:hover {
            transform: scale(1.3);
            background: hsl(var(--primary));
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          }

          .hotspot-label {
            display: none;
            position: absolute;
            bottom: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-bottom: 8px;
            padding: 6px 12px;
            background: hsl(var(--popover));
            color: hsl(var(--popover-foreground));
            border-radius: 6px;
            font-size: 12px;
            font-weight: 600;
            white-space: nowrap;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            pointer-events: none;
          }

          .hotspot-button:hover .hotspot-label {
            display: block;
          }

          .loading-indicator {
            height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </div>

      {/* Instructions for users */}
      <div className="mt-4 p-4 bg-card rounded-xl shadow-lg text-sm text-muted-foreground">
        <strong>Controls:</strong> Click and drag to rotate • Scroll to zoom • Click the circular hotspots to learn about parts
      </div>

      {/* Part Info Card - Shows when hotspot is clicked */}
      {selectedHotspot && (
        <div className="mt-4">
          <PartInfoCard
            name={selectedHotspot.label}
            description={selectedHotspot.description}
            datasheetLink={selectedHotspot.datasheet}
            onClose={handleCloseCard}
          />
        </div>
      )}
    </div>
  );
};

export default ModelViewer;
