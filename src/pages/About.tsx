import { Card } from "@/components/ui/card";
import { BookOpen, Users, Target } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">About ElectroLearn Explorer</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            An open educational platform dedicated to making electronics and embedded systems learning accessible to
            everyone.
          </p>
        </div>

        {/* Mission Section */}
        <Card className="p-8 mb-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              ElectroLearn Explorer aims to bridge the gap between theoretical electronics knowledge and practical
              implementation. We provide comprehensive, easy-to-understand documentation for development boards and
              microcontrollers, complete with interactive examples and visual aids.
            </p>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Comprehensive Docs</h3>
            <p className="text-muted-foreground">
              Detailed specifications, pinout diagrams, and technical documentation for each device.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 mb-4">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Community Driven</h3>
            <p className="text-muted-foreground">
              Built for learners by learners. Share your projects and learn from others in the community.
            </p>
          </Card>

          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Target className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Practical Focus</h3>
            <p className="text-muted-foreground">
              Ready-to-use code examples and real-world projects to get you started immediately.
            </p>
          </Card>
        </div>

        {/* What We Offer */}
        <Card className="p-8 mb-12">
          <h2 className="text-3xl font-bold mb-6 text-foreground text-center">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Interactive 3D Models</h3>
              <p className="text-muted-foreground">
                Explore development boards in 3D to understand component placement and connections better.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Detailed Pinouts</h3>
              <p className="text-muted-foreground">
                Clear pinout diagrams with descriptions for every pin, making hardware connections simple.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Component Datasheets</h3>
              <p className="text-muted-foreground">
                Direct links to official datasheets for all components on each development board.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2 text-foreground">Example Code</h3>
              <p className="text-muted-foreground">
                Production-ready code examples with explanations to jumpstart your projects.
              </p>
            </div>
          </div>
        </Card>

        {/* Technologies */}
        <Card className="p-8">
          <h2 className="text-3xl font-bold mb-6 text-foreground text-center">Built With Modern Technologies</h2>
          <div className="max-w-2xl mx-auto">
            <p className="text-muted-foreground mb-4 text-center">
              ElectroLearn Explorer is built using modern web technologies to ensure a fast, responsive, and accessible
              learning experience:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-secondary/30 rounded-lg">
                <p className="font-bold text-foreground">React</p>
              </div>
              <div className="text-center p-4 bg-secondary/30 rounded-lg">
                <p className="font-bold text-foreground">TypeScript</p>
              </div>
              <div className="text-center p-4 bg-secondary/30 rounded-lg">
                <p className="font-bold text-foreground">Vite</p>
              </div>
              <div className="text-center p-4 bg-secondary/30 rounded-lg">
                <p className="font-bold text-foreground">Tailwind CSS</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
