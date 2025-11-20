import { ExternalLink } from "lucide-react";
import { Component } from "@/types/device";

interface ComponentsTableProps {
  components: Component[];
}

/**
 * ComponentsTable - Displays a table of device components
 * Shows Part Name, Function, and Datasheet Link columns
 * Responsive and styled with Tailwind CSS
 */
const ComponentsTable = ({ components }: ComponentsTableProps) => {
  if (components.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p>No components available.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-full border-collapse">
        {/* Table Header */}
        <thead>
          <tr className="border-b border-border">
            <th className="text-left py-3 px-4 font-semibold text-foreground">
              Part Name
            </th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">
              Function
            </th>
            <th className="text-left py-3 px-4 font-semibold text-foreground">
              Datasheet Link
            </th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {components.map((component, index) => (
            <tr
              key={index}
              className="border-b border-border/50 last:border-0 hover:bg-secondary/30 transition-colors"
            >
              {/* Part Name Column */}
              <td className="py-4 px-4">
                <span className="font-medium text-foreground">{component.name}</span>
              </td>

              {/* Function Column */}
              <td className="py-4 px-4 text-muted-foreground text-sm">
                {component.function}
              </td>

              {/* Datasheet Link Column */}
              <td className="py-4 px-4">
                {component.datasheet && component.datasheet !== "#" ? (
                  <a
                    href={component.datasheet}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline flex items-center gap-1 text-sm transition-colors"
                  >
                    View
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <span className="text-muted-foreground text-sm">N/A</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComponentsTable;

