import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../../services/authService";
import Swal from "sweetalert2";

export function useSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim() || !photo.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Preencha nome, email, senha e URL da foto para continuar.",
      });
      return;
    }

    try {
      new URL(photo);
    } catch {
      await Swal.fire({
        icon: "warning",
        title: "URL inválida",
        text: "Por favor, insira uma URL válida para a foto.",
      });
      return;
    }

    try {
      setLoading(true);
      await registerRequest(name, email, password, photo);

      await Swal.fire({
        icon: "success",
        title: "Cadastro realizado com sucesso!",
        text: "Você será redirecionado para a página de login.",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/");
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "EMAIL_ALREADY_EXISTS") {
        Swal.fire({
          icon: "error",
          title: "Email já cadastrado!",
          text: "Tente fazer login ou use outro email.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro ao cadastrar!",
          text: "Tente novamente mais tarde.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    name,
    email,
    password,
    photo,
    loading,
    setName,
    setEmail,
    setPassword,
    setPhoto,
    onSubmit,
  };
}
