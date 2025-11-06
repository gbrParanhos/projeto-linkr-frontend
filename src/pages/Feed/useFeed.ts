import { useEffect, useState } from "react";
import type { Post } from "../../types";
import axios from "axios";

export function useFeed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("auth_token");

  async function fetchPosts() {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPosts(res.data);
    } catch (err) {
      console.error("Erro ao carregar posts:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();

    const refresh = () => fetchPosts();
    globalThis.addEventListener("feedUpdated", refresh);

    return () => globalThis.removeEventListener("feedUpdated", refresh);
  }, []);

  return { posts, loading, fetchPosts };
}
