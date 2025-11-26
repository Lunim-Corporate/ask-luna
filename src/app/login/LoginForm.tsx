"use client";

import { useState, useActionState } from "react";

type LoginState = {
  error?: string;
};

const initialState: LoginState = {};

type LoginFormProps = {
  action: (state: LoginState, formData: FormData) => Promise<LoginState>;
};

export function LoginForm({ action }: LoginFormProps) {
  const [isSubmitting, setSubmitting] = useState(false);
  const [state, formAction] = useActionState(async (prev: LoginState, formData: FormData) => {
    setSubmitting(true);
    try {
      return await action(prev, formData);
    } finally {
      setSubmitting(false);
    }
  }, initialState);

  return (
    <form
      action={formAction}
      className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-[#06060A]/90 p-8 shadow-[0_25px_60px_rgba(0,0,0,0.55)]"
    >
      <div className="space-y-2 text-center">
        <p className="text-sm uppercase tracking-[0.45em] text-white/50">
          Internal access
        </p>
        <h1 className="text-2xl font-semibold text-white">Sign in to view logs</h1>
        <p className="text-sm text-white/60">
          Use the credentials provided by Lunim to review Consult Luna demos.
        </p>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-white/80">
          Email
          <input
            name="email"
            type="email"
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-300 focus:outline-none"
            placeholder="hello@lunim.io"
          />
        </label>
        <label className="block text-sm font-medium text-white/80">
          Password
          <input
            name="password"
            type="password"
            required
            className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-300 focus:outline-none"
            placeholder="Password"
          />
        </label>
      </div>

      {state.error && (
        <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
          {state.error}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-gradient-to-r from-cyan-400 via-emerald-300 to-white px-8 py-3 text-base font-semibold text-black shadow-[0_15px_45px_rgba(15,129,144,0.35)] transition hover:scale-105 hover:shadow-[0_20px_60px_rgba(15,129,144,0.45)] focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-200 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Verifying..." : "Access dashboard"}
      </button>
    </form>
  );
}
