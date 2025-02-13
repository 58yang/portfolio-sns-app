// ファイル名: auth.js
import { supabase } from "../lib/supabase";
import { registerUser } from "../lib/db";

export const authRepository = {
  // メール & パスワードでのサインアップ
  async signup(name, email, password) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
        redirectTo: `${window.location.origin}/email-confirmation`,
      },
    });

    if (error) throw new Error(error.message);
    if (!data.user) throw new Error("ユーザー登録に失敗しました");

    return data.user;
  },

  // メール & パスワードでのログイン（プロフィール登録を追加）
  async signin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return null;
    }

    const user = data.user;

    // プロフィール登録（すでに存在する場合はスキップ）
    await registerUser(user);

    return {
      ...user,
      userName: user.user_metadata?.name || "No Name",
    };
  },

  // Google サインイン
  async googleSignin() {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/redirect?method=google`,
        },
      });

      if (error) throw new Error(error.message);
    } catch (err) {
      console.error("🔴 Google認証エラー:", err.message);
      throw err;
    }
  },

  // 現在のユーザーを取得（プロフィール登録を追加）
  async getCurrentUser() {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) return null;
    const user = data.user;
    // プロフィール登録（必要ならば）
    await registerUser(user);
    return {
      ...user,
      userName: user.user_metadata?.name || "No Name",
    };
  },

  // ログアウト処理
  async signout() {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return true;
  },

  // セッションを取得するメソッド
  async fetchSession() {
    const { data, error } = await supabase.auth.getSession();
    if (error || !data.session) {
      return null;
    }
    return data.session;
  },

  // ユーザー削除（投稿削除 → profiles 削除 → ログアウト）
  async deleteUser(userId, setCurrentUser, navigate) {
    if (!userId) {
      throw new Error("ユーザーIDが無効です");
    }
    console.log("🗑 ユーザー削除処理開始:", userId);
    await supabase.from("posts").delete().eq("user_id", userId);
    await supabase.from("profiles").delete().eq("id", userId);
    await this.signout();
    setCurrentUser(null); //`SessionContext` の `currentUser` をリセット
    navigate("/account-deleted");
  },
};
