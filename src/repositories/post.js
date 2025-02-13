//ファイル名:post.js

import { supabase } from "../lib/supabase";

export const postRepository = {
  async create(content, userId) {
    console.log("投稿するユーザーID:", userId);
    const { data, error } = await supabase
      .from("posts")
      .insert([
        { content, user_id: userId, created_at: new Date().toISOString() },
      ])
      .select();
    if (error != null) throw new Error(error.message);
    return data[0];
  },

  async find(page, limit) {
    page = isNaN(page) || page < 1 ? 1 : page;
    const start = limit * (page - 1);
    const end = start + limit - 1;

    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        id, 
        content, 
        created_at, 
        user_id,
        profiles(id, name)
      `
      )
      .range(start, end)
      .order("created_at", { ascending: false });

    console.log("Fetched Posts:", data);
    console.log("Fetch Error:", error);

    if (error) {
      console.warn("Supabase Fetch Warning:", error.message);
      return [];
    }

    return data.map((post) => {
      return {
        ...post,
        userId: post.user_id,
        userName: post.profiles ? post.profiles.name : "Unknown",
      };
    });
  },

  async delete(id) {
    const { error } = await supabase.from("posts").delete().eq("id", id);
    if (error != null) throw new Error(error.message);
  },
};
