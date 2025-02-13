import { Link } from "react-router-dom";

function EmailConfirmation() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h2 className="text-2xl font-bold">メール確認が必要です</h2>
      <p className="mt-4 text-center">
        ご登録のメールアドレスに確認メールを送信しました。
        <br />
        メール内のリンクをクリックして、アカウントを有効化してください。
      </p>
      <Link to="/signin" className="mt-6 text-blue-500 underline">
        ログインページへ戻る
      </Link>
    </div>
  );
}

export default EmailConfirmation;
