import { useEffect, useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authRepository } from "../repositories/auth";
import { registerUser } from "../lib/db";
import { SessionContext } from "../SessionProvider";

function AuthRedirect() {
  const { setCurrentUser } = useContext(SessionContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [message, setMessage] = useState("認証処理中...");

  useEffect(() => {
    const handleAuthRedirect = async () => {
      // クエリパラメータから認証方法を判定
      const searchParams = new URLSearchParams(location.search);
      const method = searchParams.get("method");

      if (method === "google") {
        setMessage("Google認証完了_処理中...");
      } else if (method === "email") {
        setMessage("メール認証完了_処理中...");
      }

      //alert("認証処理を開始します。開発者ツールを開いてください！");
      // セッション取得
      const session = await authRepository.fetchSession();
      if (!session || !session.user) {
        console.error("セッションが取得できませんでした");
        navigate("/signin");
        return;
      }

      console.log("セッション取得成功。ユーザー:", session.user);

      // プロフィールを登録
      await registerUser(session.user);

      // ユーザー情報をセットしてホームへ遷移
      setCurrentUser(session.user);
      navigate("/");
    };

    handleAuthRedirect();
  }, [navigate, setCurrentUser, location.search]);

  return <div>{message}</div>;
}

export default AuthRedirect;
