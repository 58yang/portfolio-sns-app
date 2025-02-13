import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../SessionProvider";
import { authRepository } from "../repositories/auth";

export function SideMenu() {
  const { currentUser, setCurrentUser } = useContext(SessionContext);
  const navigate = useNavigate();

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
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-fit"
        >
          アカウント削除
        </button>
      </div>
    </div>
  );
}
