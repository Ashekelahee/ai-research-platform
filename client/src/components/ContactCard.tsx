import { Mail, Phone, Globe, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ContactCardProps {
  name: string;
  email?: string;
  phone?: string;
  website?: string;
  location?: string;
  departmentColor?: string;
  departmentColorLight?: string;
}

export default function ContactCard({
  name,
  email,
  phone,
  website,
  location,
  departmentColor = "#6366f1",
  departmentColorLight = "#e0e7ff",
}: ContactCardProps) {
  return (
    <Card
      className="p-6 border-2 hover:shadow-lg transition-all"
      style={{
        borderColor: `${departmentColor}40`,
        backgroundColor: `${departmentColorLight}20`,
      }}
    >
      <h3 className="font-semibold mb-4 text-lg" style={{ color: departmentColor }}>
        {name}
      </h3>

      <div className="space-y-3 text-sm">
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-3 group transition-all"
          >
            <div
              className="p-2 rounded-lg group-hover:scale-110 transition-transform"
              style={{ backgroundColor: `${departmentColor}20` }}
            >
              <Mail className="w-4 h-4" style={{ color: departmentColor }} />
            </div>
            <span className="text-muted-foreground group-hover:underline break-all">
              {email}
            </span>
          </a>
        )}

        {phone && (
          <a
            href={`tel:${phone}`}
            className="flex items-center gap-3 group transition-all"
          >
            <div
              className="p-2 rounded-lg group-hover:scale-110 transition-transform"
              style={{ backgroundColor: `${departmentColor}20` }}
            >
              <Phone className="w-4 h-4" style={{ color: departmentColor }} />
            </div>
            <span className="text-muted-foreground group-hover:underline">
              {phone}
            </span>
          </a>
        )}

        {website && (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group transition-all"
          >
            <div
              className="p-2 rounded-lg group-hover:scale-110 transition-transform"
              style={{ backgroundColor: `${departmentColor}20` }}
            >
              <Globe className="w-4 h-4" style={{ color: departmentColor }} />
            </div>
            <span className="text-muted-foreground group-hover:underline">
              Website
            </span>
          </a>
        )}

        {location && (
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{ backgroundColor: `${departmentColor}20` }}
            >
              <MapPin className="w-4 h-4" style={{ color: departmentColor }} />
            </div>
            <span className="text-muted-foreground">
              {location}
            </span>
          </div>
        )}
      </div>
    </Card>
  );
}
