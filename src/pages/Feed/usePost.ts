import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import type { Post } from "../../types";

export function usePost() {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  const token = localStorage.getItem("auth_token");

  async function handlePost() {
    if (!link.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Campo obrigatório",
        text: "Por favor, insira um link antes de publicar.",
        confirmButtonColor: "#1877F2",
      });
      return;
    }

    try {
      new URL(link.trim());
    } catch {
      Swal.fire({
        icon: "error",
        title: "Link inválido",
        text: "Por favor, insira um link válido (ex: https://exemplo.com).",
        confirmButtonColor: "#1877F2",
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_BACKEND}/posts`,
        { link, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Publicado!",
        text: "Seu link foi compartilhado com sucesso.",
        confirmButtonColor: "#1877F2",
      });
      setLink("");
      setDescription("");
      globalThis.dispatchEvent(new Event("feedUpdated"));
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Houve um erro ao publicar seu link. Tente novamente.",
        confirmButtonColor: "#1877F2",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {(async () => {
    try {
      setLoadingPosts(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'ngrok-skip-browser-warning': true
        },

      });
      setPosts(res.data);
    } catch (err) {
      console.error("Erro ao carregar posts:", err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Um erro aconteceu. Atualize a página ou tente novamente em alguns minutos.",
        confirmButtonColor: "#1877F2",
      });
    } finally {
      setLoadingPosts(false);
    }
  })()}, []);

  return {
    link,
    description,
    setLink,
    setDescription,
    loading,
    handlePost,
    loadingPosts,
    posts,
  };
}
