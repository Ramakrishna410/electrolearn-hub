import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CodeBlock from "@/components/CodeBlock";
import ModelViewer from "@/components/ModelViewer";
import { ArrowLeft, ExternalLink } from "lucide-react";
import esp32Board from "@/assets/esp32-board.jpg";
import esp32Pinout from "@/assets/esp32-pinout.jpg";

interface Hotspot {
  id: string;
  name: string;
  description: string;
  position: string;
  normal: string;
}

interface DeviceData {
  name: string;
  description: string;
  image: string;
  pinoutImage: string;
  specifications: Record<string, string>;
  components: Array<{
    name: string;
    function: string;
    datasheetLink: string;
  }>;
  exampleCode: string;
  features: string[];
  useCases: string[];
  modelPath?: string;
  hotspots?: Hotspot[];
}

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
        <Link to="/gallery">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Button>
        </Link>

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">{deviceData.name}</h1>
          <p className="text-xl text-muted-foreground">{deviceData.description}</p>
        </div>

        {/* Main Image */}
        <Card className="overflow-hidden mb-8">
          <img src={esp32Board} alt={deviceData.name} className="w-full h-auto object-cover max-h-96" />
        </Card>

        {/* 3D Model Viewer */}
        {deviceData.modelPath && deviceData.hotspots && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Interactive 3D Model</h2>
            <ModelViewer
              modelPath={deviceData.modelPath}
              hotspots={deviceData.hotspots}
              alt={`${deviceData.name} 3D Model`}
            />
          </div>
        )}

        {/* Specifications */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Technical Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(deviceData.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-border last:border-0">
                <span className="font-medium text-foreground capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}:
                </span>
                <span className="text-muted-foreground">{value}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Features & Use Cases */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Key Features</h2>
            <ul className="space-y-2">
              {deviceData.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-primary mr-2">✓</span>
                  <span className="text-muted-foreground">{feature}</span>
                </li>
              ))}
            </ul>
          </Card>
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Common Use Cases</h2>
            <ul className="space-y-2">
              {deviceData.useCases.map((useCase, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-accent mr-2">→</span>
                  <span className="text-muted-foreground">{useCase}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        {/* Pinout Diagram */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Pinout Diagram</h2>
          <div className="bg-secondary/30 rounded-lg overflow-hidden">
            <img src={esp32Pinout} alt="ESP32 Pinout" className="w-full h-auto" />
          </div>
        </Card>

        {/* Components List */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Components & Parts</h2>
          <div className="space-y-4">
            {deviceData.components.map((component, index) => (
              <div key={index} className="p-4 bg-secondary/30 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-foreground">{component.name}</h3>
                  {component.datasheetLink !== "#" && (
                    <a
                      href={component.datasheetLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center gap-1 text-sm"
                    >
                      Datasheet
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <p className="text-muted-foreground text-sm">{component.function}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Example Code */}
        <Card className="p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4 text-foreground">Example Code</h2>
          <p className="text-muted-foreground mb-4">
            Get started with this simple LED blink example for the ESP32:
          </p>
          <CodeBlock code={deviceData.exampleCode} language="cpp" />
        </Card>
      </div>
    </div>
  );
};

export default DeviceDetail;
