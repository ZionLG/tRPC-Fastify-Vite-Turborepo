import { postRouter } from "./routers/post.ts";
import { testRouter } from "./routers/test.ts";
import { createTRPCRouter } from "./trpc.ts";

export const appRouter = createTRPCRouter({
  test: testRouter,
  post: postRouter,
});

// Export only the type of a router!
// This prevents us from importing server code on the client.
export type AppRouter = typeof appRouter;
