import { supabase } from "./supabase";

export const registerUser = async (user) => {
  if (!user) {
    return;
  }

  const { error: profileError } = await supabase.from("profiles").upsert([
    {
      id: user.id,
      name: user.user_metadata?.name || "No Name",
      avatar_url: user.user_metadata?.avatar_url || "",
    },
  ]);

  if (profileError) {
    console.error("Error updating profile:", profileError);
  }

  const { error: roleError } = await supabase.from("user_roles").upsert([
    {
      user_id: user.id,
      role: "user",
    },
  ]);

  if (roleError) {
    console.error("Error updating role:", roleError);
  }
};
