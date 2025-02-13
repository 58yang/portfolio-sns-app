//ファイル名:SessionProvider.js

import { createContext, useEffect, useState } from "react";
import { authRepository } from "./repositories/auth";
import LoadingSpinner from "./components/LoadingSpinner";
import { supabase } from "./lib/supabase";

const SessionContext = createContext();

const SessionProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("セッション取得エラー:", error.message);
        setCurrentUser(null);
        return;
      }

      const { session } = data;
      if (session) {
        const currentUser = await authRepository.getCurrentUser();
        setCurrentUser(currentUser);
      } else {
        console.log("セッションが存在しません。");
        setCurrentUser(null);
      }
    } catch (error) {
      console.error("セッション取得エラー:", error.message);
      setCurrentUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // ローディング中は LoadingSpinner コンポーネントを表示
  if (isLoading) return <LoadingSpinner />;

  return (
    <SessionContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
