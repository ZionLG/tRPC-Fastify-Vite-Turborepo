import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";

const createContext = ({ req, res }: CreateFastifyContextOptions) => ({
  req,
  res,
});

export { createContext };
export type Context = Awaited<ReturnType<typeof createContext>>;
