import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import {
  getAllLabs,
  getLabById,
  getResearchersByLabId,
  getResearcherById,
  getEquipmentByLabId,
  getEquipmentById,
  createCollaborationRequest,
  getCollaborationRequestById,
  getCollaborationRequests,
  updateCollaborationRequestStatus,
  mockLabs,
  mockEquipment,
} from "./mockData";
import { invokeLLM } from "./_core/llm";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  /**
   * Lab procedures
   */
  labs: router({
    list: publicProcedure.query(async () => {
      return getAllLabs();
    }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getLabById(input.id);
      }),

    getWithDetails: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const lab = getLabById(input.id);
        if (!lab) return null;

        const researchers = getResearchersByLabId(input.id);
        const equipment = getEquipmentByLabId(input.id);

        return {
          ...lab,
          researchers,
          equipment,
        };
      }),
  }),

  /**
   * Researcher procedures
   */
  researchers: router({
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getResearcherById(input.id);
      }),

    getByLabId: publicProcedure
      .input(z.object({ labId: z.number() }))
      .query(async ({ input }) => {
        return getResearchersByLabId(input.labId);
      }),
  }),

  /**
   * Equipment procedures
   */
  equipment: router({
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getEquipmentById(input.id);
      }),

    getByLabId: publicProcedure
      .input(z.object({ labId: z.number() }))
      .query(async ({ input }) => {
        return getEquipmentByLabId(input.labId);
      }),
  }),

  /**
   * Semantic Search procedures
   */
  search: router({
    semantic: publicProcedure
      .input(z.object({ query: z.string() }))
      .mutation(async ({ input }) => {
        try {
          // Generate search interpretation using LLM
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content:
                  "You are a research lab matching system. Convert the user's research need into a structured search query. Return a JSON object with: searchTerms (array of keywords), researchAreas (array of research field keywords), equipmentTypes (array of equipment keywords).",
              },
              {
                role: "user",
                content: input.query,
              },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "search_query",
                strict: true,
                schema: {
                  type: "object",
                  properties: {
                    searchTerms: {
                      type: "array",
                      items: { type: "string" },
                      description: "General search keywords",
                    },
                    researchAreas: {
                      type: "array",
                      items: { type: "string" },
                      description: "Research field keywords",
                    },
                    equipmentTypes: {
                      type: "array",
                      items: { type: "string" },
                      description: "Equipment type keywords",
                    },
                  },
                  required: ["searchTerms", "researchAreas", "equipmentTypes"],
                  additionalProperties: false,
                },
              },
            },
          });

          const content = response.choices[0]?.message.content;
          if (!content || typeof content !== "string") {
            return { labs: [], equipment: [], researchers: [], query: null };
          }

          const parsed = JSON.parse(content);

          // Filter labs based on research areas
          const allLabs = getAllLabs();
          const matchedLabs = allLabs.filter((lab) => {
            const fields = lab.researchFields || [];
            return parsed.researchAreas.some((area: string) =>
              fields.some((field) =>
                field.toLowerCase().includes(area.toLowerCase())
              )
            );
          });

          // Get equipment from matched labs
          const matchedEquipment = [];
          for (const lab of matchedLabs) {
            const labEquip = getEquipmentByLabId(lab.id);
            matchedEquipment.push(...labEquip);
          }

          // Filter equipment by type
          const filteredEquipment = matchedEquipment.filter((equip) => {
            const category = (equip.category || "").toLowerCase();
            return parsed.equipmentTypes.some((type: string) =>
              category.toLowerCase().includes(type.toLowerCase())
            );
          });

          return {
            labs: matchedLabs,
            equipment: filteredEquipment,
            researchers: [],
            query: parsed,
          } as any;
        } catch (error) {
          console.error("Search error:", error);
          return { labs: [], researchers: [], equipment: [], error: "Search failed" };
        }
      }),
  }),

  /**
   * Collaboration Request procedures
   */
  collaborationRequests: router({
    create: publicProcedure
      .input(
        z.object({
          requesterName: z.string(),
          requesterEmail: z.string().email(),
          requesterCompany: z.string().optional(),
          requesterPhone: z.string().optional(),
          labId: z.number().optional(),
          researcherId: z.number().optional(),
          equipmentId: z.number().optional(),
          collaborationType: z.enum([
            "contract_research",
            "joint_project",
            "pilot_testing",
            "consultation",
          ]),
          description: z.string(),
          budget: z.string().optional(),
          timeline: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        return createCollaborationRequest({
          ...input,
          status: "pending",
        });
      }),

    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return getCollaborationRequestById(input.id);
      }),

    list: protectedProcedure
      .input(
        z.object({
          status: z.string().optional(),
          labId: z.number().optional(),
        })
      )
      .query(async ({ input, ctx }) => {
        // Only admins can view all requests
        if (ctx.user?.role !== "admin") {
          return [];
        }
        return getCollaborationRequests(input);
      }),

    updateStatus: protectedProcedure
      .input(
        z.object({
          id: z.number(),
          status: z.enum([
            "pending",
            "reviewed",
            "accepted",
            "rejected",
            "completed",
          ]),
        })
      )
      .mutation(async ({ input, ctx }) => {
        // Only admins can update status
        if (ctx.user?.role !== "admin") {
          throw new Error("Unauthorized");
        }

        return updateCollaborationRequestStatus(input.id, input.status);
      }),
  }),
});

export type AppRouter = typeof appRouter;
