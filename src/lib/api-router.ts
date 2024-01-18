import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { apiRouterErrors } from "./errors";

const isProduction = process.env.NODE_ENV === "production";

const PRISMA_KNOW_ERRORS: Record<string, string> = {
  P1001: "Can't reach database.",
  P1002: "Database timeout.",
  P1003: "Database does not exist.",
};

export type ApiContext = {
  params: Record<string, string | string[] | undefined>;
};

export async function captureErrors(handler: () => Promise<Response>) {
  try {
    return await handler();
  } catch (err) {
    let status = 500;
    let message = "Unknown error";
    let stack: string[] = [];

    if (
      err instanceof PrismaClientInitializationError ||
      err instanceof PrismaClientValidationError ||
      err instanceof PrismaClientUnknownRequestError ||
      err instanceof PrismaClientKnownRequestError
    ) {
      status = 500;
      message = isProduction
        ? "Error querying the database."
        : PRISMA_KNOW_ERRORS[err.name] ?? err.message.split("\n");
      stack = isProduction ? [] : err.stack?.split("\n") ?? [];
    } else if (err instanceof Error) {
      const castedError = err as Error;

      const knownError = Object.values(apiRouterErrors).find(
        (knownError) => knownError.message === castedError.message,
      );

      if (knownError) {
        status = knownError.status;
        message = knownError.message;
      }

      stack = err.stack?.split("\n") ?? [];
    }

    const showInDev = { stack, err };

    return Response.json(
      { message, ...(isProduction ? {} : showInDev) },
      { status },
    );
  }
}
