import { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import { prisma } from "@trpc-react/db";

/**
 * Defines your inner context shape.
 * Add fields here that the inner context brings.
 */
interface CreateInnerContextOptions
  extends Partial<CreateFastifyContextOptions> {}

/**
 * Inner context. Will always be available in your procedures, in contrast to the outer context.
 *
 * Also useful for:
 * - testing, so you don't have to mock `req`/`res`
 * - tRPC's `createServerSideHelpers` where we don't have `req`/`res`
 *
 * @see https://trpc.io/docs/context#inner-and-outer-context
 */
export async function createContextInner(opts?: CreateInnerContextOptions) {
  return {
    prisma,
  };
}

export async function createContext({ req, res }: CreateFastifyContextOptions) {
  const contextInner = await createContextInner();

  return {
    ...contextInner,
    req,
    res,
  };
}

export type Context = Awaited<ReturnType<typeof createContextInner>>;
