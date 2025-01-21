"use client";

import { useActionState } from "react";
import login from "@/actions/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type State = {
  message: string;
  error?: {
    email?: string;
    password?: string;
  };
  success?: boolean;
}

const initialState: State = {
  message: "",
  success: false,
};

export default function Login() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <div className="w-full max-w-sm mx-auto space-y-6">
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            aria-invalid={!!state?.error?.email}
          />
          {state?.error?.email && (
            <p className="text-sm text-red-500">{state.error.email}</p>
          )}
        </div>

        <div className="space-y-2">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            required
            aria-invalid={!!state?.error?.password}
          />
          {state?.error?.password && (
            <p className="text-sm text-red-500">{state.error.password}</p>
          )}
        </div>

        <p aria-live="polite" className="text-sm text-red-500">
          {state.message}
        </p>

        <Button
          type="submit"
          className="w-full"
          disabled={pending}
        >
          {pending ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
}