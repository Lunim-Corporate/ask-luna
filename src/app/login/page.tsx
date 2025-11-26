import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LoginForm } from "./LoginForm";
import {
  DASHBOARD_COOKIE,
  DASHBOARD_COOKIE_VALUE,
  DASHBOARD_EMAIL,
  verifyDashboardPassword,
} from "@/lib/auth";

type LoginState = {
  error?: string;
};

async function authenticate(_: LoginState, formData: FormData): Promise<LoginState> {
  "use server";

  const email = formData.get("email")?.toString().trim() ?? "";
  const password = formData.get("password")?.toString() ?? "";

  if (email !== DASHBOARD_EMAIL || !verifyDashboardPassword(password)) {
    return { error: "Incorrect email or password. Please try again." };
  }

  const cookieStore = await cookies();
  cookieStore.set(DASHBOARD_COOKIE, DASHBOARD_COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 8,
  });

  redirect("/dashboard");
}

export default async function LoginPage() {
  const cookieStore = await cookies();
  const isAuthenticated =
    cookieStore.get(DASHBOARD_COOKIE)?.value === DASHBOARD_COOKIE_VALUE;

  if (isAuthenticated) {
    redirect("/dashboard");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-5 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(92,225,230,0.15),transparent_55%)]" />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <p className="text-sm uppercase tracking-[0.5em] text-white/60">
          Lunim internal
        </p>
        <LoginForm action={authenticate} />
      </div>
    </div>
  );
}
