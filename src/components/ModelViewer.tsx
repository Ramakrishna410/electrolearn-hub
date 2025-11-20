import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";

interface Hotspot {
  id: string;
  name: string;
  description: string;
  position: string;
  normal: string;
}

interface ModelViewerProps {
  modelPath: string;
  hotspots: Hotspot[];
  alt?: string;
}

const ModelViewer = ({ modelPath, hotspots, alt = "3D Model" }: ModelViewerProps) => {
  const [selectedHotspot, setSelectedHotspot] = useState<Hotspot | null>(null);
  const modelViewerRef = useRef<any>(null);

  useEffect(() => {
    // Add event listeners for hotspots
    const modelViewer = modelViewerRef.current;
    if (!modelViewer) return;

    const handleHotspotClick = (event: any) => {
      const hotspotId = event.target.dataset.hotspotId;
      const hotspot = hotspots.find(h => h.id === hotspotId);
      if (hotspot) {
        setSelectedHotspot(hotspot);
      }
    };

    // Attach click listeners to all hotspot buttons
    const hotspotElements = modelViewer.querySelectorAll('button[slot^="hotspot-"]');
    hotspotElements.forEach((el: any) => {
      el.addEventListener('click', handleHotspotClick);
    });

    return () => {
      hotspotElements.forEach((el: any) => {
        el.removeEventListener('click', handleHotspotClick);
      });
    };
  }, [hotspots]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* 3D Model Viewer */}
      <div className="lg:col-span-2">
        <Card className="overflow-hidden">
          <model-viewer
            ref={modelViewerRef}
            src={modelPath}
            alt={alt}
            camera-controls
            auto-rotate
            shadow-intensity="1"
            style={{
              width: '100%',
              height: '500px',
              background: 'hsl(var(--secondary))',
            }}
          >
            {/* Render hotspots */}
            {hotspots.map((hotspot) => (
              <button
                key={hotspot.id}
                className="hotspot"
                slot={hotspot.id}
                data-position={hotspot.position}
                data-normal={hotspot.normal}
                data-hotspot-id={hotspot.id}
              >
                <div className="hotspot-annotation">
                  <div className="hotspot-label">
                    <strong>{hotspot.name}</strong>
                    <p>{hotspot.description}</p>
                  </div>
                </div>
              </button>
            ))}

            {/* Loading indicator */}
            <div className="loading-indicator" slot="poster">
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            </div>
          </model-viewer>

          <style>{`
            .hotspot {
              display: block;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              border: 2px solid hsl(var(--primary));
              background: hsl(var(--background));
              box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
              cursor: pointer;
              transition: all 0.2s ease;
            }

            .hotspot:hover {
              transform: scale(1.2);
              background: hsl(var(--primary));
            }

            .hotspot-annotation {
              display: none;
              position: absolute;
              background: hsl(var(--popover));
              color: hsl(var(--popover-foreground));
              padding: 12px;
              border-radius: 8px;
              border: 1px solid hsl(var(--border));
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
              max-width: 250px;
              pointer-events: none;
              z-index: 10;
              bottom: 100%;
              left: 50%;
              transform: translateX(-50%) translateY(-8px);
              white-space: normal;
            }

            .hotspot:hover .hotspot-annotation {
              display: block;
            }

            .hotspot-label strong {
              display: block;
              margin-bottom: 4px;
              font-size: 14px;
              color: hsl(var(--foreground));
            }

            .hotspot-label p {
              margin: 0;
              font-size: 12px;
              line-height: 1.4;
              color: hsl(var(--muted-foreground));
            }

            .loading-indicator {
              height: 500px;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          `}</style>
        </Card>

        <div className="mt-4 p-4 bg-secondary/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Controls:</strong> Click and drag to rotate • Scroll to zoom • Click hotspots to learn more
          </p>
        </div>
      </div>

      {/* Info Sidebar */}
      <div className="lg:col-span-1">
        <Card className="p-6 sticky top-4">
          <h3 className="text-xl font-bold mb-4 text-foreground">
            {selectedHotspot ? "Selected Part" : "Interactive 3D Model"}
          </h3>
          
          {selectedHotspot ? (
            <div className="space-y-4">
              <div>
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium mb-3">
                  Active Hotspot
                </div>
                <h4 className="text-lg font-bold text-foreground mb-2">
                  {selectedHotspot.name}
                </h4>
                <p className="text-muted-foreground">
                  {selectedHotspot.description}
                </p>
              </div>
              
              <button
                onClick={() => setSelectedHotspot(null)}
                className="w-full px-4 py-2 bg-secondary hover:bg-secondary/80 text-foreground rounded-md transition-colors"
              >
                Clear Selection
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Explore the 3D model by clicking on the highlighted hotspots to learn about different components.
              </p>
              
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-3 text-foreground">Available Hotspots:</h4>
                <ul className="space-y-2">
                  {hotspots.map((hotspot) => (
                    <li 
                      key={hotspot.id}
                      className="text-sm text-muted-foreground flex items-start"
                    >
                      <span className="text-primary mr-2">•</span>
                      <span>{hotspot.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ModelViewer;
