import { useEffect, useState } from "react";
import { useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Mail, Phone, Globe, Users, Microscope } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CollaborationForm from "@/components/CollaborationForm";
import ContactCard from "@/components/ContactCard";

export default function LabDetail() {
  const params = useParams();
  const [, setLocation] = useLocation();
  const labId = parseInt(params?.id || "0");
  const [lab, setLab] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const getLabQuery = trpc.labs.getWithDetails.useQuery(
    { id: labId },
    { enabled: labId > 0 }
  );

  useEffect(() => {
    if (getLabQuery.data) {
      setLab(getLabQuery.data);
      setLoading(false);
    }
  }, [getLabQuery.data]);

  if (loading || !lab) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container py-20">
          <p className="text-muted-foreground">Loading lab details...</p>
        </div>
      </div>
    );
  }

  const researchers = lab.researchers || [];
  const equipment = lab.equipment || [];
  const researchFields = Array.isArray(lab.researchFields) ? lab.researchFields : [];
  const services = Array.isArray(lab.services) ? lab.services : [];

  const departmentColor = lab?.departmentColor || "#6366f1";
  const departmentColorLight = lab?.departmentColorLight || "#e0e7ff";
  const backgroundGradient = lab?.backgroundGradient || `linear-gradient(135deg, ${departmentColorLight} 0%, #f5f3ff 100%)`;

  return (
    <div className="min-h-screen" style={{ background: backgroundGradient }}>
      {/* Header */}
      <div className="border-b border-border/40 bg-white/70 backdrop-blur-sm">
        <div className="container py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLocation("/search-results")}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="flex justify-between items-start gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-1">{lab.name}</h1>
              <p className="text-sm text-muted-foreground">{lab.department}</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">Request Collaboration</Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Request Collaboration</DialogTitle>
                </DialogHeader>
                <CollaborationForm labId={lab.id} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-6">
            {/* Overview */}
            <Card className="p-6 border-border/40">
              <h2 className="text-xl font-semibold mb-3">Overview</h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{lab.description}</p>

              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Location</p>
                  <p className="font-semibold">{lab.location || "N/A"}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Impact Score</p>
                  <p className="font-semibold">{lab.impactScore || "0"}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Publications</p>
                  <p className="font-semibold">{lab.publicationsCount || "0"}</p>
                </div>
                <div>
                  <p className="font-medium text-muted-foreground mb-1">Department</p>
                  <p className="font-semibold">{lab.department || "N/A"}</p>
                </div>
              </div>
            </Card>

            {/* Research Fields */}
            {researchFields.length > 0 && (
              <Card className="p-6 border-border/40">
                <h2 className="text-xl font-semibold mb-3">Research Fields</h2>
                <div className="flex flex-wrap gap-2">
                  {researchFields.map((field: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: `${departmentColor}20`,
                        color: departmentColor,
                      }}
                    >
                      {field}
                    </span>
                  ))}
                </div>
              </Card>
            )}

            {/* Services */}
            {services.length > 0 && (
              <Card className="p-6 border-border/40">
                <h2 className="text-xl font-semibold mb-3">Services Offered</h2>
                <ul className="space-y-2 text-sm">
                  {services.map((service: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            )}

            {/* Equipment */}
            {equipment.length > 0 && (
              <Card className="p-6 border-border/40">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Microscope className="w-5 h-5" />
                  Equipment ({equipment.length})
                </h2>
                <div className="space-y-3">
                  {equipment.map((item: any) => (
                    <div
                      key={item.id}
                      className="p-4 border border-border/40 rounded-lg hover:bg-muted/30 transition text-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{item.name}</h3>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium whitespace-nowrap ml-2 ${
                            item.bookingStatus === "available"
                              ? "bg-green-100/50 text-green-700"
                              : item.bookingStatus === "booked"
                                ? "bg-yellow-100/50 text-yellow-700"
                                : "bg-red-100/50 text-red-700"
                          }`}
                        >
                          {item.bookingStatus}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                      {item.category && (
                        <p className="text-xs">
                          <span className="font-medium">Category:</span> {item.category}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Researchers */}
            {researchers.length > 0 && (
              <Card className="p-6 border-border/40">
                <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Researchers ({researchers.length})
                </h2>
                <div className="space-y-4">
                  {researchers.map((researcher: any) => (
                    <div
                      key={researcher.id}
                      className="p-4 border border-border/40 rounded-lg hover:bg-muted/30 transition text-sm"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{researcher.name}</h3>
                          {researcher.title && (
                            <p className="text-xs text-muted-foreground">{researcher.title}</p>
                          )}
                        </div>
                        {researcher.availableForCollaboration && (
                          <span className="px-2 py-0.5 bg-green-100/50 text-green-700 rounded text-xs font-medium whitespace-nowrap ml-2">
                            Available
                          </span>
                        )}
                      </div>

                      {researcher.bio && (
                        <p className="text-xs text-muted-foreground mb-2">{researcher.bio}</p>
                      )}

                      {Array.isArray(researcher.expertise) && researcher.expertise.length > 0 && (
                        <div className="mb-2">
                          <div className="flex flex-wrap gap-1">
                            {researcher.expertise.map((exp: string, idx: number) => (
                        <span
                          key={idx}
                          className="px-2 py-1 rounded text-xs"
                          style={{
                            backgroundColor: `${departmentColor}20`,
                            color: departmentColor,
                          }}
                        >
                          {exp}
                        </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex gap-3 text-xs">
                        {researcher.email && (
                          <a
                            href={`mailto:${researcher.email}`}
                            className="flex items-center gap-1 text-accent hover:underline"
                          >
                            <Mail className="w-3 h-3" />
                            Email
                          </a>
                        )}
                        {researcher.phone && (
                          <a
                            href={`tel:${researcher.phone}`}
                            className="flex items-center gap-1 text-accent hover:underline"
                          >
                            <Phone className="w-3 h-3" />
                            Call
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Contact Card */}
            <div className="sticky top-20">
              <ContactCard
                name={lab.name}
                email={lab.contactEmail}
                phone={lab.contactPhone}
                website={lab.website}
                location={lab.location}
                departmentColor={departmentColor}
                departmentColorLight={departmentColorLight}
              />
              <Button className="w-full mt-4" size="sm">
                Request Collaboration
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
