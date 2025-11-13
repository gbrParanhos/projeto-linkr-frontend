// src/pages/profile/useProfile.ts
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import type { Post } from "../../types";

type Profile = {
  name: string;
  age: string;
  imageUrl: string;
  about: string;
};

export function useProfile() {
  const [profile, setProfile] = useState<Profile>({
    name: "",
    age: "",
    imageUrl: "",
    about: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  const token = localStorage.getItem("auth_token");

  function handleFieldChange(field: keyof Profile, value: string) {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function handleToggleEdit() {
    setIsEditing((prev) => !prev);
  }

  async function handleSubmitProfile() {
    if (!isEditing) return;

    try {
      setIsSaving(true);

      await axios.put(
        `${import.meta.env.VITE_BACKEND}/users/me`,
        {
          name: profile.name.trim(),
          age: profile.age ? Number(profile.age) : null,
          imageUrl: profile.imageUrl.trim() || null,
          about: profile.about.trim() || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        title: "Perfil atualizado!",
        text: "Suas informações foram salvas com sucesso.",
        confirmButtonColor: "#1877F2",
      });

      setIsEditing(false);
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível atualizar seu perfil. Tente novamente.",
        confirmButtonColor: "#1877F2",
      });
    } finally {
      setIsSaving(false);
    }
  }

  async function fetchProfile() {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = res.data as {
        name: string;
        age?: number | null;
        image_url?: string | null;
        about?: string | null;
      };

      setProfile({
        name: data.name ?? "",
        age: data.age != null ? String(data.age) : "",
        imageUrl: data.image_url ?? "",
        about: data.about ?? "",
      });
    } catch (err) {
      console.error("Erro ao carregar perfil:", err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível carregar seus dados de perfil.",
        confirmButtonColor: "#1877F2",
      });
    }
  }

  async function fetchMyPosts() {
    try {
      setLoadingPosts(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND}/posts/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": true,
        },
      });
      setPosts(res.data as Post[]);
    } catch (err) {
      console.error("Erro ao carregar posts do perfil:", err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Não foi possível carregar seus posts. Tente novamente.",
        confirmButtonColor: "#1877F2",
      });
    } finally {
      setLoadingPosts(false);
    }
  }

  async function handleDeletePost(postId: number) {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND}/posts/${postId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Swal.fire({
        icon: "success",
        title: "Deletado!",
        text: "Seu link foi deletado com sucesso.",
        confirmButtonColor: "#1877F2",
      });

      await fetchMyPosts();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Erro",
        text: "Houve um erro ao deletar seu link. Tente novamente.",
        confirmButtonColor: "#1877F2",
      });
    }
  }

  async function handleEditPost(postId: number, data: { description: string; link: string }): Promise<boolean> {
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

      await fetchMyPosts();
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
    }
  }

  useEffect(() => {
    (async () => {
      await fetchProfile();
      await fetchMyPosts();
    })();
  }, []);

  return {
    profile,
    isEditing,
    isSaving,
    loadingPosts,
    posts,
    handleFieldChange,
    handleToggleEdit,
    handleSubmitProfile,
    handleDeletePost,
    handleEditPost,
  };
}
