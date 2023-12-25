import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { observable } from "@trpc/server/observable";

export const appRouter = router({
  greeting: publicProcedure
    .input(z.object({ name: z.string() }))
    .query(({ input }) => {
      return { text: `${input?.name ?? "world"}` };
    }),
  randomNumber: publicProcedure.subscription(() => {
    return observable<{ randomNumber: number }>((emit) => {
      const timer = setInterval(() => {
        emit.next({ randomNumber: Math.random() });
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    });
  }),
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
