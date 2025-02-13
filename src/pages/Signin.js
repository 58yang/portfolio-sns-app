// ファイル名: Signin.js

import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { authRepository } from "../repositories/auth";
import { SessionContext } from "../SessionProvider";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { currentUser, setCurrentUser } = useContext(SessionContext);
  const navigate = useNavigate();

  // メール & パスワードでログイン
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await authRepository.signin(email, password);
      if (!user) throw new Error("ログインに失敗しました。");

      setCurrentUser(user);
      navigate("/"); // ログイン成功後に遷移
    } catch (err) {
      console.error("ログイン処理でエラー:", err.message);
      alert(err.message || "予期しないエラーが発生しました。");
    }
  };

  // Googleでログイン（auth.js利用）
  const handleGoogleSignIn = async () => {
    try {
      await authRepository.googleSignin();
    } catch (err) {
      console.error("Googleログインエラー:", err.message);
      alert(err.message || "予期しないエラーが発生しました。");
    }
  };

  // すでにログインしている場合はリダイレクト
  if (currentUser) return <Navigate replace to="/" />;

  return (
    <div className="min-h-screen bg-[#D0D2D9] py-10 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-extrabold text-black">SNS APP デモ画面</h2>
        <div className="mt-8 w-full max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSignInSubmit}>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  メールアドレス
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    placeholder="メールアドレス"
                    required
                    type="email"
                    autoComplete="username"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-sm font-medium text-gray-700"
                  htmlFor="password"
                >
                  パスワード
                </label>
                <div className="mt-1">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    placeholder="パスワード"
                    required
                    type="password"
                    autoComplete="current-password"
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#010326] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={email === "" || password === ""}
                >
                  ログイン
                </button>
              </div>
            </form>
            <div>
              <button
                onClick={handleGoogleSignIn}
                className="w-full mt-4 py-2 bg-red-500 text-white rounded"
              >
                Googleでログイン
              </button>
            </div>
            <div className="mt-4 text-center text-sm">
              登録は
              <Link className="underline" to={"/signup"}>
                こちら
              </Link>
              から
            </div>
          </div>
        </div>
        <div className="mt-4 w-full max-w-md">
          <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  デモ(User)ログイン用メールアドレス
                </label>
                <div className="mt-1 bg-gray-100 text-gray-900 px-2 py-1 rounded">
                  demo1@test.com
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  デモ(User)ログイン用パスワード
                </label>
                <div className="mt-1 bg-gray-100 text-gray-900 px-2 py-1 rounded">
                  demo_Demo_123
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-4 w-full max-w-md">
          <div className="bg-white py-4 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="space-y-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  デモ(AllView)ログイン用メールアドレス
                </label>
                <div className="mt-1 bg-gray-100 text-gray-900 px-2 py-1 rounded">
                  demo2@test.com
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  デモ(AllView)ログイン用パスワード
                </label>
                <div className="mt-1 bg-gray-100 text-gray-900 px-2 py-1 rounded">
                  demo_Demo_234
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signin;
