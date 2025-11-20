import DeviceCard from "@/components/DeviceCard";
import esp32Board from "@/assets/esp32-board.jpg";

const DeviceGallery = () => {
  const devices = [
    {
      id: "esp32",
      name: "ESP32 Development Board",
      description:
        "A powerful, low-cost microcontroller with integrated Wi-Fi and Bluetooth capabilities, perfect for IoT projects.",
      image: esp32Board,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Device Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Explore our collection of development boards and microcontrollers with detailed documentation.
          </p>
        </div>

        {/* Device Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              name={device.name}
              description={device.description}
              image={device.image}
              deviceId={device.id}
            />
          ))}
        </div>

        {/* Coming Soon Message */}
        <div className="mt-16 text-center p-8 bg-secondary/50 rounded-lg border border-border">
          <h3 className="text-2xl font-bold mb-2 text-foreground">More Devices Coming Soon</h3>
          <p className="text-muted-foreground">
            We're constantly adding new development boards and microcontrollers to our gallery. Stay tuned!
          </p>
        </div>
      </div>
    </div>
  );
};

export default DeviceGallery;
