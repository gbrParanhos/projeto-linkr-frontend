import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import type { Post } from "../../types";

export function usePost() {
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const fetchErrorShownRef = useRef(false);

  const token = localStorage.getItem("auth_token");

  async function handlePost() {
    const trimmedLink = link.trim();

    if (!trimmedLink) {
      Swal.fire({
        icon: "warning",
        title: "Campo obrigatório",
        text: "Por favor, insira um link antes de publicar.",
        confirmButtonColor: "#1877F2",
      });
      return;
    }

    try {
      new URL(trimmedLink);
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
        { link: trimmedLink, description },
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
      await fetchPosts();
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

  async function handleDelete(postId: number) {
    try {
      setLoading(true);
      await axios.delete(`${import.meta.env.VITE_BACKEND}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire({
        icon: "success",
        title: "Deletado!",
        text: "Seu link foi deletado com sucesso.",
        confirmButtonColor: "#1877F2",
      });
      await fetchPosts();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Houve um erro ao deletar seu link. Tente novamente.",
        confirmButtonColor: "#1877F2",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(postId: number, data: { description: string; link: string }): Promise<boolean> {
    const trimmedLink = data.link.trim();

    if (!trimmedLink) {
      Swal.fire({
        icon: "warning",
        title: "Campo obrigatório",
        text: "Por favor, insira um link antes de atualizar.",
        confirmButtonColor: "#1877F2",
      });
      return false;
    }

    try {
      new URL(trimmedLink);
    } catch {
      Swal.fire({
        icon: "error",
        title: "Link inválido",
        text: "Por favor, insira um link válido (ex: https://exemplo.com).",
        confirmButtonColor: "#1877F2",
      });
      return false;
    }

    try {
      setLoading(true);
      await axios.put(
        `${import.meta.env.VITE_BACKEND}/posts/${postId}`,
        {
          link: trimmedLink,
          description: data.description,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Atualizado!",
        text: "Seu post foi atualizado com sucesso.",
        confirmButtonColor: "#1877F2",
      });

      await fetchPosts();
      return true;
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível atualizar seu post. Tente novamente.",
        confirmButtonColor: "#1877F2",
      });

      return false;
    } finally {
      setLoading(false);
    }
  }

  async function fetchPosts() {
    try {
      setLoadingPosts(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": true,
        },
      });
      setPosts(res.data);
      fetchErrorShownRef.current = false;
    } catch (err) {
      console.error("Erro ao carregar posts:", err);
      if (!fetchErrorShownRef.current) {
        Swal.fire({
          icon: "error",
          title: "Erro",
          text: "Um erro aconteceu. Atualize a página ou tente novamente em alguns minutos.",
          confirmButtonColor: "#1877F2",
        });
        fetchErrorShownRef.current = true;
      }
    } finally {
      setLoadingPosts(false);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchPosts();
    })();
  }, []);

  return {
    link,
    description,
    setLink,
    setDescription,
    loading,
    handlePost,
    loadingPosts,
    posts,
    handleDelete,
    handleEdit,
  };
}
