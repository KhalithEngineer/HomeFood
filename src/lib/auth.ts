import { supabase } from "./supabase";

export async function signInWithGoogle() {
  console.log(`${window.location.origin}/auth/callback`);
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
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

export async function createDeliveryAddress(address: {
  addressLine1: string;
  addressLine2: string;
  area: string;
  pincode: string;
  landmark: string;
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("User not authenticated");

  const { data, error } = await supabase
    .from("delivery_addresses")
    .insert([
      {
        user_id: user.id,
        address_line1: address.addressLine1,
        address_line2: address.addressLine2,
        area: address.area,
        pincode: address.pincode,
        landmark: address.landmark,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error("Error creating address:", error);
    throw error;
  }
  return data;
}

export async function createSubscription(
  userId: string,
  period: "day" | "week" | "month",
  cuisineType: string = "All Cuisines",
  deliveryAddressId: string,
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
      cuisine_type: cuisineType,
      delivery_address_id: deliveryAddressId,
      active_until: new Date(
        Date.now() + durationInDays[period] * 24 * 60 * 60 * 1000,
      ).toISOString(),
    },
  ]);

  if (error) {
    console.error("Error creating subscription:", error);
    throw error;
  }
  return data;
}
