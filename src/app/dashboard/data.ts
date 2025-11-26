import { supabaseServer } from "@/lib/supabaseServer";

export type ConversationRow = {
  id: string;
  session_id: string;
  privacy_mode: "on-the-record" | "confidential";
  interaction_mode: "voice" | "text";
  messages: unknown;
  plan_summary: string | null;
  plan_details: unknown;
  created_at: string;
};

export type ConversationSummary = Pick<
  ConversationRow,
  "id" | "session_id" | "privacy_mode" | "interaction_mode" | "plan_summary" | "created_at"
>;

export type LunaMessage = {
  role: "luna" | "user";
  content: string;
};

export type PlanDetails = {
  summary?: string;
  tags?: string[];
  nextSteps?: { title: string; description: string; action?: string }[];
  keyInsights?: string[];
  estimatedScope?: string;
  calendlyPurpose?: string;
};

export const parseJSON = <T,>(value: unknown): T | null => {
  if (!value) return null;
  if (typeof value === "object") {
    return value as T;
  }
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }
  return null;
};

export const formatDate = (dateString: string) => {
  try {
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(dateString));
  } catch {
    return dateString;
  }
};

export async function fetchRecentConversations(): Promise<ConversationSummary[]> {
  try {
    const supabase = supabaseServer();
    const { data, error } = await supabase
      .from("luna_conversations")
      .select("id,session_id,privacy_mode,interaction_mode,plan_summary,created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[dashboard] Failed to load summaries", error);
      throw error;
    }

    return (data ?? []) as ConversationSummary[];
  } catch (error) {
    return handleSupabaseError(error, "recent conversations");
  }
}

export async function fetchConversationById(id: string): Promise<ConversationRow | null> {
  if (!id) return null;
  try {
    const supabase = supabaseServer();

    const { data, error } = await supabase
      .from("luna_conversations")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("[dashboard] Failed to load conversation", error);
      throw error;
    }

    return data as ConversationRow;
  } catch (error) {
    return handleSupabaseError(error, "conversation");
  }
}

function handleSupabaseError(error: unknown, context: string): never {
  const message =
    error instanceof Error ? error.message : typeof error === "string" ? error : "Unknown error";
  console.error(`[dashboard] Supabase error for ${context}:`, error);

  if (message.includes("ENOTFOUND")) {
    throw new Error(
      "Cannot reach Supabase. Network access is required to load actual conversation data."
    );
  }

  throw new Error("Unable to load " + context + ". Check Supabase credentials/RLS policies.");
}
