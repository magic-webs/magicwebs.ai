import type { Metadata } from "next";
import { LoginForm } from "@/components/owner/login-form";
import { Brandmark } from "@/components/brandmark";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function OwnerLoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center px-(--gutter) py-16">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <div className="flex flex-col gap-5">
          <Brandmark />
          <div className="flex flex-col gap-2">
            <h1 className="m-0 font-display text-3xl leading-tight font-semibold tracking-tighter">
              Owner panel
            </h1>
            <p className="m-0 font-mono text-sm text-muted">
              Enquiries and traffic for magicwebs.ai.
            </p>
          </div>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
