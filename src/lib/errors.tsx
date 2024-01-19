import { DotFilledIcon, DotIcon } from "@radix-ui/react-icons";
import { toast } from "sonner";
import { type ZodError } from "zod";

export const apiRouterErrors = {
  unauthorized: {
    message: "Unauthorized",
    status: 401,
  },
  notFound: {
    message: "Not found",
    status: 404,
  },
};

// *** ZOD Errors parser ***

export function parseZorError(err: ZodError) {
  const errors = new Map();

  for (const issue of err.issues) {
    if (errors.get(issue.message)) continue;
    errors.set(issue.message, issue.message);
  }

  const errorsArray = Array.from(errors.values()).map((e) => (
    <p key={e} className="mb-1 flex items-center gap-2 last:mb-0">
      <DotFilledIcon /> {e}
    </p>
  ));

  toast.custom(
    () => (
      <div className="px-4 py-2 text-sm">
        <p className="mb-2 font-bold text-white">
          There was an error with your submission
        </p>
        {errorsArray}
      </div>
    ),
    {
      style: {
        background: `hsl(358, 76%, 10%)`,
        border: `1px solid hsl(357, 89%, 16%)`,
        color: `hsl(358, 100%, 81%)`,
        borderRadius: `0.5rem`,
      },
    },
  );
}
