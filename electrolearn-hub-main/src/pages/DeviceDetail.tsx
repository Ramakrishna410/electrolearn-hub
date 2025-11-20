import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CodeBlock from "@/components/CodeBlock";
import ModelViewer from "@/components/ModelViewer";
import ComponentsTable from "@/components/ComponentsTable";
import PinoutViewer from "@/components/PinoutViewer";
import { DeviceData } from "@/types/device";
import { ArrowLeft } from "lucide-react";

const DeviceDetail = () => {
  const { deviceId } = useParams();
  const [deviceData, setDeviceData] = useState<DeviceData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeviceData = async () => {
      try {
        const response = await fetch(`/data/${deviceId}.json`);
        const data = await response.json();
        setDeviceData(data);
      } catch (error) {
        console.error("Error loading device data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeviceData();
  }, [deviceId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading device data...</p>
        </div>
      </div>
    );
  }

  if (!deviceData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Device Not Found</h2>
          <Link to="/gallery">
            <Button>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/gallery" className="mb-6 inline-block">
          <Button variant="ghost">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{deviceData.name}</h1>
        </div>

        {/* 2-Column Layout: Left (Model Viewer) | Right (Info Sections) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Model Viewer (full width on mobile) */}
          <div className="w-full lg:sticky lg:top-4 lg:self-start">
            {deviceData.model && (
              <ModelViewer
                src={deviceData.model}
                alt={`${deviceData.name} 3D Model`}
                autoRotate={true}
                cameraControls={true}
                hotspots={deviceData.hotspots || []}
              />
            )}
          </div>

          {/* Right Column: Part Info, Components, Pinout, Code */}
          <div className="flex flex-col gap-6">
            {/* Components Table */}
            <div className="rounded-xl shadow-lg p-4 bg-card">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Components & Parts</h2>
              <ComponentsTable components={deviceData.components} />
            </div>

            {/* Pinout Diagram */}
            <div className="rounded-xl shadow-lg p-4 bg-card">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Pinout Diagram</h2>
              <PinoutViewer 
                imageSrc={deviceData.pinoutImage} 
                alt={`${deviceData.name} Pinout`}
              />
            </div>

            {/* Example Code */}
            <div className="rounded-xl shadow-lg p-4 bg-card">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Example Code</h2>
              <p className="text-muted-foreground mb-4">
                Get started with this example code for the {deviceData.name}:
              </p>
              <CodeBlock code={deviceData.exampleCode} language="cpp" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeviceDetail;
