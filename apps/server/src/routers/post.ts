import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const postRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({ title: z.string().min(1), content: z.string().optional() }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.post.create({
        data: {
          title: input.title,
          content: input.content,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),
});
