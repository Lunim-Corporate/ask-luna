import Link from "next/link";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { DASHBOARD_COOKIE, DASHBOARD_COOKIE_VALUE } from "@/lib/auth";
import {
  fetchConversationById,
  formatDate,
  parseJSON,
  LunaMessage,
  PlanDetails,
} from "../data";

export const revalidate = 30;

export default async function ConversationDetailPage(props: {
  params: Promise<{ conversationId: string }>;
}) {
  const cookieStore = await cookies();
  const isAuthenticated =
    cookieStore.get(DASHBOARD_COOKIE)?.value === DASHBOARD_COOKIE_VALUE;

  if (!isAuthenticated) {
    redirect("/login");
  }

  const { conversationId } = await props.params;
  const conversation = await fetchConversationById(conversationId);

  if (!conversation) {
    notFound();
  }

  const messages = parseJSON<LunaMessage[]>(conversation.messages) ?? [];
  const plan = parseJSON<PlanDetails>(conversation.plan_details);

  return (
    <div className="min-h-screen bg-black px-5 py-12 text-white sm:px-8 lg:px-16">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-white/70">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-white/60 transition hover:text-white"
          >
            ← Back to dashboard
          </Link>
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
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="text-3xl font-semibold text-white">
            Conversation details
          </h1>
          <time className="text-xs uppercase tracking-[0.4em] text-white/60">
            {formatDate(conversation.created_at)}
          </time>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr,1fr]">
          <section className="space-y-5 rounded-3xl border border-white/10 bg-[#0B0B0F] p-6">
            <h2 className="text-lg font-semibold text-white">
              Conversation transcript
            </h2>
            <ol className="space-y-4">
              {messages.length === 0 ? (
                <li className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
                  No transcript available for this session.
                </li>
              ) : (
                messages.map((message, idx) => (
                  <li
                    key={`${conversation.id}-${idx}`}
                    className={`rounded-2xl border p-4 ${
                      message.role === "luna"
                        ? "border-cyan-400/40 bg-cyan-400/10"
                        : "border-white/10 bg-white/[0.03]"
                    }`}
                  >
                    <p
                      className={`text-xs uppercase tracking-[0.4em] ${
                        message.role === "luna"
                          ? "text-cyan-200"
                          : "text-white/60"
                      }`}
                    >
                      {message.role === "luna" ? "Luna" : "Visitor"}
                    </p>
                    <p
                      className={`mt-2 text-sm ${
                        message.role === "luna"
                          ? "text-white/90"
                          : "text-white/80"
                      }`}
                    >
                      {message.content}
                    </p>
                  </li>
                ))
              )}
            </ol>
          </section>

          <section className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.02] p-6">
            <div>
              <h3 className="text-sm uppercase tracking-[0.4em] text-white/60">
                Plan summary
              </h3>
              <p className="mt-3 text-sm text-white/80">
                {conversation.plan_summary ??
                  plan?.summary ??
                  "No plan summary recorded."}
              </p>
            </div>

            {plan?.tags && plan.tags.length > 0 && (
              <div>
                <h4 className="text-sm uppercase tracking-[0.4em] text-white/60">
                  Tags
                </h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {plan.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1 text-xs uppercase tracking-[0.3em] text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {plan?.nextSteps && plan.nextSteps.length > 0 && (
              <div>
                <h4 className="text-sm uppercase tracking-[0.4em] text-white/60">
                  Next steps
                </h4>
                <ul className="mt-3 space-y-3 text-sm text-white/80">
                  {plan.nextSteps.map((step, index) => (
                    <li
                      key={`${conversation.id}-step-${index}`}
                      className="rounded-xl border border-white/10 bg-black/30 p-3"
                    >
                      <p className="font-semibold">{step.title}</p>
                      <p className="text-white/70">{step.description}</p>
                      {step.action && (
                        <p className="text-xs uppercase tracking-[0.4em] text-white/50">
                          action: {step.action}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {plan?.keyInsights && plan.keyInsights.length > 0 && (
              <div>
                <h4 className="text-sm uppercase tracking-[0.4em] text-white/60">
                  Key insights
                </h4>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-white/80">
                  {plan.keyInsights.map((insight, index) => (
                    <li key={`${conversation.id}-insight-${index}`}>
                      {insight}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {plan?.estimatedScope && (
              <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-sm text-white/80">
                <p className="uppercase tracking-[0.4em] text-white/60">
                  Estimated scope
                </p>
                <p className="mt-2">{plan.estimatedScope}</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
