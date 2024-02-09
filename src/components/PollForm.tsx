"use client";

import { parseZorError } from "@/lib/errors";
import { useCreatePoll } from "@/lib/hooks/polls";
import { createPollId, createPollOptionId } from "@/lib/ids";
import { pollSchema } from "@/lib/polls";
import { TIME_LIMITS } from "@/lib/time-limits";
import { InfoCircledIcon, PlusIcon, TrashIcon } from "@radix-ui/react-icons";
import React from "react";
import { toast } from "sonner";
import CreatedPoll from "./CreatedPoll";
import CreatingPoll from "./CreatingPoll";
import { Button } from "./ui/button";
import { FormGroup } from "./ui/form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { TypographyH2, TypographyP } from "./ui/typography";

type Props = {
  isQuickPoll?: boolean;
};

export default function PollForm({ isQuickPoll = false }: Props) {
  const { trigger, isMutating, data } = useCreatePoll();

  const titleInputRef = React.useRef<HTMLInputElement>(null);

  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({
    title: "",
    description: "",
    password: "",
    timeLimit: 3600, // 1 hour
    options: [
      { id: createPollOptionId(), label: "" },
      { id: createPollOptionId(), label: "" },
    ],
  });

  function handleChange(value: string | number, key: keyof typeof form) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleChangeOptions(newOptions: typeof form.options) {
    setForm((prev) => ({ ...prev, options: newOptions }));
  }

  function handleAddOption() {
    setForm((prev) => ({
      ...prev,
      options: [...prev.options, { id: createPollOptionId(), label: "" }],
    }));
  }

  function handleRestartForm() {
    setForm({
      title: "",
      description: "",
      password: "",
      timeLimit: 3600, // 1 hour
      options: [
        { id: createPollOptionId(), label: "" },
        { id: createPollOptionId(), label: "" },
      ],
    });
    setIsSubmitted(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const parsed = pollSchema.safeParse(form);

    if (!parsed.success) {
      parseZorError(parsed.error);

      return;
    }

    const { options, ...rest } = form;

    await trigger(
      {
        id: createPollId(),
        options: { create: options },
        ...rest,
      },
      {
        onSuccess: () => {
          toast.success("Poll created.");
          setIsSubmitted(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      },
    );
  }

  React.useEffect(() => {
    // Focus on title input when the form is rendered
    titleInputRef.current?.focus();
  }, []);

  if (isMutating) return <CreatingPoll />;
  else if (isSubmitted && data)
    return <CreatedPoll pollId={data.id} onRestart={handleRestartForm} />;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <section className="flex flex-col gap-6">
        <FormGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            ref={titleInputRef}
            id="title"
            type="text"
            placeholder="Title"
            value={form.title}
            onChange={(e) => handleChange(e.target.value, "title")}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description</Label>
          <Textarea
            rows={4}
            id="description"
            placeholder="Description"
            value={form.description}
            onChange={(e) => handleChange(e.target.value, "description")}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="secrete" className="flex items-center">
            Password
            <Tooltip delayDuration={200}>
              <TooltipTrigger type="button">
                <InfoCircledIcon className="ml-2 h-4 w-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-sm text-pretty text-center text-xs">
                  {isQuickPoll
                    ? `You can't set a password for a quick poll. Log in to create a poll with a password.`
                    : `Password is optional. If you set a password, your audience
                  will need to enter it before they can submit their vote.`}
                </p>
              </TooltipContent>
            </Tooltip>
          </Label>
          <Input
            autoComplete="new-password"
            id="secrete"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => handleChange(e.target.value, "password")}
            disabled={isQuickPoll}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="timeLimit" className="flex items-center">
            Time limit
            {isQuickPoll && (
              <Tooltip delayDuration={200}>
                <TooltipTrigger type="button">
                  <InfoCircledIcon className="ml-2 h-4 w-4 text-gray-500" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-sm text-pretty text-center text-xs">
                    You can&apos;t set a time limit for a quick poll.
                  </p>
                </TooltipContent>
              </Tooltip>
            )}
          </Label>
          <Select
            value={String(form.timeLimit)}
            onValueChange={(value) => handleChange(Number(value), "timeLimit")}
            disabled={isQuickPoll}
          >
            <SelectTrigger id="timeLimit">
              <SelectValue placeholder="Select when to stop accepting submissions" />
            </SelectTrigger>
            <SelectContent>
              {TIME_LIMITS.map((timeLimit) => (
                <SelectGroup key={timeLimit.groupLabel}>
                  <SelectLabel>{timeLimit.groupLabel}</SelectLabel>
                  {timeLimit.options.map((option) => (
                    <SelectItem value={String(option.value)} key={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              ))}
            </SelectContent>
          </Select>
        </FormGroup>
      </section>

      <hr className="border-gray-800" />

      <section>
        <header>
          <TypographyH2 className="font-bold">Options</TypographyH2>
          <TypographyP>
            Add your options for the polls.{" "}
            <strong>
              {isQuickPoll && "You can add up to 3 options for a quick poll."}
            </strong>
          </TypographyP>
        </header>

        <section className="mt-6 grid gap-4">
          {form.options.map((option, index) => (
            <div key={option.id} className="flex gap-6">
              <Input
                type="text"
                placeholder="Option"
                value={option.label}
                onChange={(e) =>
                  handleChangeOptions(
                    form.options.map((o, i) =>
                      i === index ? { ...o, label: e.target.value } : o,
                    ),
                  )
                }
              />

              {form.options.length > 2 && (
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      variant="ghost"
                      size="icon"
                      type="button"
                      className="text-gray-700 hover:bg-red-300 hover:text-red-800"
                      onClick={() =>
                        handleChangeOptions(
                          form.options.filter((o) => o.id !== option.id),
                        )
                      }
                    >
                      <TrashIcon className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-sm text-pretty text-center text-xs">
                      Remove option
                    </p>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          ))}
        </section>

        <Button
          onClick={handleAddOption}
          type="button"
          size="small"
          variant="outlined"
          className="ml-auto mt-4 flex"
          disabled={
            isQuickPoll ? form.options.length >= 3 : form.options.length >= 10
          }
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add option
        </Button>
      </section>

      <Button type="submit" size="large">
        Create poll
      </Button>
    </form>
  );
}
