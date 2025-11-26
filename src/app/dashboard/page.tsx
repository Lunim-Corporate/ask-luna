import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DASHBOARD_COOKIE, DASHBOARD_COOKIE_VALUE } from "@/lib/auth";
import { fetchRecentConversations, formatDate } from "./data";

export const revalidate = 30;

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const isAuthenticated =
    cookieStore.get(DASHBOARD_COOKIE)?.value === DASHBOARD_COOKIE_VALUE;

  if (!isAuthenticated) {
    redirect("/login");
  }

  const conversations = await fetchRecentConversations();

  return (
    <div className="min-h-screen bg-black px-5 py-16 text-white sm:px-8 lg:px-16">
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-4">
        <p className="text-sm uppercase tracking-[0.6em] text-white/60">
          Ask Luna demo
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Conversation intelligence dashboard
        </h1>
        <p className="max-w-3xl text-base text-white/70 sm:text-lg">
          Review conversations captured inside the Ask Luna widget over the last
          seven days. Select a session to dive into the transcript and plan
          details.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-white/70">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            {conversations.length} conversations this week
          </span>
          <span className="rounded-full border border-white/10 px-3 py-1.5">
            Auto-refreshes every {revalidate} seconds
          </span>
        </div>
      </section>

      <section className="mx-auto mt-12 w-full max-w-6xl space-y-6">
        {conversations.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white/70">
            No conversations were recorded in the last seven days. Send a test
            message through Ask Luna to populate this dashboard.
          </div>
        ) : (
          conversations.map((conversation) => (
            <article
              key={conversation.id}
              className="rounded-3xl border border-white/10 bg-[#0B0B0F] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] transition hover:border-cyan-200/70"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-white/70">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.4em]">
                    {conversation.privacy_mode.replace("-", " ")}
                  </span>
                  <span className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.4em]">
                    {conversation.interaction_mode} mode
                  </span>
                  <span className="px-3 py-1 font-mono text-xs text-white/60">
                    {conversation.session_id}
                  </span>
                </div>
                <time className="text-xs uppercase tracking-[0.4em]">
                  {formatDate(conversation.created_at)}
                </time>
              </div>
              <p className="mt-4 text-base text-white/80 line-clamp-3">
                {conversation.plan_summary ??
                  "Plan summary not captured for this session."}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.4em] text-white/50">
                  View transcript & plan
                </span>
                <Link
                  href={`/dashboard/${conversation.id}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-200/70 hover:text-cyan-50"
                >
                  Open details →
                </Link>
              </div>
            </article>
          ))
        )}
      </section>
    </div>
  );
}
