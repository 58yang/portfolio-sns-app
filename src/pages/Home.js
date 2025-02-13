//ファイル名:Home.js

import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../SessionProvider";
import { Navigate } from "react-router-dom";
import { SideMenu } from "../components/SideMenu";
import { postRepository } from "../repositories/post";
import { PostCard } from "../components/PostCard";
import { Pagination } from "../components/Pagination";
import { authRepository } from "../repositories/auth";

const limit = 5;

function Home() {
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const { currentUser, setCurrentUser } = useContext(SessionContext);

  useEffect(() => {
    fetchPosts();

    // 300秒ごとに投稿を自動更新
    const interval = setInterval(() => {
      fetchPosts();
    }, 300000);

    // クリーンアップ
    return () => clearInterval(interval);
  }, [currentUser]);

  const createPost = async (e) => {
    e.preventDefault();

    // 最新の currentUser を取得
    const updatedUser = await authRepository.getCurrentUser();
    setCurrentUser(updatedUser);
    // 更新後の currentUser を使って投稿
    const post = await postRepository.create(content, updatedUser.id);
    setPosts([
      { ...post, userId: updatedUser.id, userName: updatedUser.userName },
      ...posts,
    ]);
    setContent("");
  };

  const fetchPosts = async (page) => {
    const posts = await postRepository.find(page, limit);
    setPosts(posts);
  };

  const moveToNext = async () => {
    const nextPage = page + 1;
    await fetchPosts(nextPage);
    setPage(nextPage);
  };

  const moveToPrev = async () => {
    const prevPage = page - 1;
    await fetchPosts(prevPage);
    setPage(prevPage);
  };

  const deletePost = async (postId) => {
    await postRepository.delete(postId);
    setPosts(posts.filter((post) => post.id !== postId));
  };

  const signout = async () => {
    await authRepository.signout();
    setCurrentUser(null);
  };

  if (currentUser == null) return <Navigate replace to="/signin" />;

  return (
    <div className="min-h-screen bg-[#D0D2D9]">
      <header className="bg-[#010326] p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">SNS APP</h1>
          <button
            className="bg-[#010326] text-white px-4 py-2 rounded-md  hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            onClick={signout}
          >
            ログアウト
          </button>
        </div>
      </header>
      <div className="container mx-auto mt-6 p-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <div className="bg-white p-4 rounded-lg shadow-md">
              <form onSubmit={createPost}>
                <textarea
                  className="w-full p-2 mb-4 border-2 border-gray-200 rounded-md"
                  placeholder="Ctrl+Enterで投稿できます。投稿者とログインユーザーが同じ場合は、投稿を削除できます。"
                  onChange={(e) => setContent(e.target.value)}
                  value={content}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
                      e.preventDefault();
                      createPost(e);
                    }
                  }}
                />
                <button
                  type="submit"
                  className="bg-[#010326] text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={content === ""}
                >
                  Post
                </button>
              </form>
            </div>
            <div className="mt-4">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} onDelete={deletePost} />
              ))}
            </div>
            <Pagination
              onPrev={page > 1 ? moveToPrev : null}
              onNext={posts.length >= limit ? moveToNext : null}
            />
          </div>
          <SideMenu />
        </div>
      </div>
    </div>
  );
}

export default Home;
