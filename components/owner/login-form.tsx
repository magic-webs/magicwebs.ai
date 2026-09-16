"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type LoginState } from "@/app/owner/actions";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex cursor-pointer items-center justify-center rounded-pill border border-ink bg-ink px-7 py-3.5 font-mono text-sm font-medium tracking-wide text-cream transition-[background-color,border-color] duration-200 ease-standard hover:border-accent-hover hover:bg-accent-hover disabled:cursor-progress disabled:opacity-60"
    >
      {pending ? "Checking…" : "Sign in"}
    </button>
  );
}

export function LoginForm() {
  const [state, formAction] = useActionState<LoginState, FormData>(login, {});

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          className="font-mono text-xs tracking-wide text-muted uppercase"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          autoFocus
          required
          aria-describedby={state.error ? "login-error" : undefined}
          className="w-full rounded-lg border border-line-strong bg-paper px-4 py-3.5 font-mono text-base text-ink transition-colors duration-150 ease-standard focus:border-ink focus:outline-none"
        />
      </div>

      {state.error ? (
        <p
          id="login-error"
          role="alert"
          className="m-0 rounded-lg bg-danger/10 px-4 py-3 font-mono text-xs leading-relaxed text-danger"
        >
          {state.error}
        </p>
      ) : null}

      <SubmitButton />
    </form>
  );
}
