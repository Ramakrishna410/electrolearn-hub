import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface DeviceCardProps {
  name: string;
  description: string;
  image: string;
  deviceId: string;
}

const DeviceCard = ({ name, description, image, deviceId }: DeviceCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video overflow-hidden bg-secondary">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-foreground">{name}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{description}</p>
        <Link to={`/device/${deviceId}`}>
          <Button variant="default" className="w-full group">
            Learn More
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default DeviceCard;
