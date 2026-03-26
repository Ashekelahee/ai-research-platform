import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

interface CollaborationFormProps {
  labId?: number;
  researcherId?: number;
  equipmentId?: number;
}

export default function CollaborationForm({
  labId,
  researcherId,
  equipmentId,
}: CollaborationFormProps) {
  const [formData, setFormData] = useState({
    requesterName: "",
    requesterEmail: "",
    requesterCompany: "",
    requesterPhone: "",
    collaborationType: "contract_research" as const,
    projectType: "",
    ndaRequired: false,
    customAgreement: false,
    description: "",
    budget: "",
    timeline: "",
  });

  const createMutation = trpc.collaborationRequests.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createMutation.mutateAsync({
        ...formData,
        projectType: formData.projectType || "Research Collaboration",
        labId,
        researcherId,
        equipmentId,
      });

      toast.success("Collaboration request submitted successfully!");
      setFormData({
        requesterName: "",
        requesterEmail: "",
        requesterCompany: "",
        requesterPhone: "",
        collaborationType: "contract_research",
        projectType: "",
        ndaRequired: false,
        customAgreement: false,
        description: "",
        budget: "",
        timeline: "",
      });
    } catch (error) {
      toast.error("Failed to submit collaboration request");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name *</label>
          <Input
            type="text"
            required
            value={formData.requesterName}
            onChange={(e) =>
              setFormData({ ...formData, requesterName: e.target.value })
            }
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Email *</label>
          <Input
            type="email"
            required
            value={formData.requesterEmail}
            onChange={(e) =>
              setFormData({ ...formData, requesterEmail: e.target.value })
            }
            placeholder="your@email.com"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Company</label>
          <Input
            type="text"
            value={formData.requesterCompany}
            onChange={(e) =>
              setFormData({ ...formData, requesterCompany: e.target.value })
            }
            placeholder="Your company name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Phone</label>
          <Input
            type="tel"
            value={formData.requesterPhone}
            onChange={(e) =>
              setFormData({ ...formData, requesterPhone: e.target.value })
            }
            placeholder="+358 (optional)"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Collaboration Type *
        </label>
        <Select
          value={formData.collaborationType}
          onValueChange={(value: any) =>
            setFormData({ ...formData, collaborationType: value })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="contract_research">Contract Research</SelectItem>
            <SelectItem value="joint_project">Joint RDI Project</SelectItem>
            <SelectItem value="pilot_testing">Pilot / Testing</SelectItem>
            <SelectItem value="consultation">Consultation</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Project Type</label>
        <Input
          type="text"
          value={formData.projectType}
          onChange={(e) =>
            setFormData({ ...formData, projectType: e.target.value })
          }
          placeholder="e.g., Material Testing, Equipment Validation"
        />
      </div>

      <div className="space-y-3 p-4 bg-muted/30 rounded-lg border border-border/40">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.ndaRequired}
            onChange={(e) =>
              setFormData({ ...formData, ndaRequired: e.target.checked })
            }
            className="w-4 h-4 rounded"
          />
          <span className="text-sm font-medium">NDA Required</span>
        </label>
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.customAgreement}
            onChange={(e) =>
              setFormData({ ...formData, customAgreement: e.target.checked })
            }
            className="w-4 h-4 rounded"
          />
          <span className="text-sm font-medium">Custom Agreement Needed</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Description of Your Need *
        </label>
        <Textarea
          required
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Describe your research needs, project goals, and how the lab can help..."
          rows={5}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Budget Range</label>
          <Input
            type="text"
            value={formData.budget}
            onChange={(e) =>
              setFormData({ ...formData, budget: e.target.value })
            }
            placeholder="e.g., €10,000 - €50,000"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Timeline</label>
          <Input
            type="text"
            value={formData.timeline}
            onChange={(e) =>
              setFormData({ ...formData, timeline: e.target.value })
            }
            placeholder="e.g., 3-6 months"
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={createMutation.isPending}
        className="w-full"
        size="lg"
      >
        {createMutation.isPending ? "Submitting..." : "Submit Request"}
      </Button>

      <p className="text-xs text-muted-foreground">
        * Required fields. The research team will review your request and contact you within 2-3
        business days.
      </p>
    </form>
  );
}
