import { initTRPC } from "@trpc/server";
import { createContext } from "./context";
import superjson from "superjson";
import { ZodError } from "zod";

const trpc = initTRPC.context<typeof createContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const createTRPCRouter = trpc.router;
export const middleware = trpc.middleware;
export const publicProcedure = trpc.procedure;
