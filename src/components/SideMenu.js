import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../SessionProvider";
import { authRepository } from "../repositories/auth";
import { supabase } from "../lib/supabase";

export function SideMenu() {
  const { currentUser, setCurrentUser } = useContext(SessionContext);
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  // useEffectでcurrentUserの情報をロード
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await authRepository.getCurrentUser(); // ユーザー情報を取得する関数
        setCurrentUser(user);
      } catch (error) {
        alert("ユーザー情報の取得に失敗しました。");
      }
    };

    if (!currentUser) {
      fetchUser();
    }
  }, [currentUser, setCurrentUser]); // currentUserが変更されたら再取得

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        console.log("Current user:", user);

        if (user) {
          // user_rolesテーブルからroleを取得
          const { data, error } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", user.id) // user_rolesテーブルではuser_idカラムを使用
            .single();

          console.log("Role data:", data);
          console.log("Error if any:", error);

          if (error) {
            console.error("ロールの取得エラー:", error);
            return;
          }

          if (data) {
            setUserRole(data.role);
          }
        }
      } catch (error) {
        console.error("ユーザーロールの確認中にエラーが発生:", error);
      }
    };

    checkUserRole();
  }, []);

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("本当にアカウントを削除しますか？");
    if (!confirmDelete) return;

    try {
      await authRepository.deleteUser(currentUser.id, setCurrentUser, navigate);
    } catch (error) {
      alert("アカウントの削除に失敗しました。");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md h-auto w-full max-w-sm md:w-60 self-start">
      <h2 className="text-xl font-semibold mb-2">Your Profile</h2>
      {currentUser ? (
        <>
          <p className="sm:text-sm break-words w-full">
            <strong>Name:</strong> {currentUser.userName}
          </p>
          <p className="sm:text-sm break-words w-full">
            <strong>Email:</strong> {currentUser.email}
          </p>
        </>
      ) : (
        <p className="sm:text-sm break-words w-full">Loading...</p>
      )}
      <div className="mt-3">
        <button
          onClick={handleDeleteAccount}
          disabled={userRole === "guest"}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          アカウントを削除
        </button>
      </div>
    </div>
  );
}
