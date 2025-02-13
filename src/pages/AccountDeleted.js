// ファイル名: src/pages/AccountDeleted.js

import { Link } from "react-router-dom";

function AccountDeleted() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold text-red-600">アカウント削除完了</h2>
        <p className="mt-4 text-gray-600">
          アカウントが正常に削除されました。ご利用ありがとうございました。
        </p>
        <p className="mt-2 text-gray-500">
          再度利用するには、新しいアカウントを作成してください。
        </p>
        <Link
          to="/signup"
          className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          新規登録
        </Link>
      </div>
    </div>
  );
}

export default AccountDeleted;
