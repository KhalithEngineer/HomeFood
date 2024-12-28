import { supabase } from "./supabase";

export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}/auth/callback`,
    },
  });

  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function createSubscription(
  userId: string,
  period: "day" | "week" | "month",
) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const prices = {
    day: 299,
    week: 1499,
    month: 4999,
  };

  const durationInDays = {
    day: 1,
    week: 7,
    month: 30,
  };

  const { data, error } = await supabase.from("subscriptions").insert([
    {
      user_id: userId,
      user_name: user?.user_metadata?.full_name || "Anonymous",
      user_email: user?.email,
      period,
      price: prices[period],
      active_until: new Date(
        Date.now() + durationInDays[period] * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
  ]);

  if (error) throw error;
  return data;
}
