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
      err instanceof
      (PrismaClientKnownRequestError ||
        PrismaClientUnknownRequestError ||
        PrismaClientValidationError ||
        PrismaClientInitializationError)
    ) {
      status = 500;
      message = isProduction
        ? "Error querying the database."
        : PRISMA_KNOW_ERRORS[err.code] ?? err.cause ?? err.message;
      stack = isProduction ? [] : err.stack?.split("\n") ?? [];
    } else if (err instanceof Error) {
      const knownError = Object.values(apiRouterErrors).find(
        (knownError) => knownError.message === err.message,
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
