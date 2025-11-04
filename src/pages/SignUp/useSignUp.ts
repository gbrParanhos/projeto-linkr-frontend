import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerRequest } from "../../services/authService";
import Swal from "sweetalert2";

export function useSignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Preencha nome, email e senha para continuar.",
      });
      return;
    }

    try {
      setLoading(true);
      await registerRequest(name, email, password);

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
      } else if (err instanceof Error) {
        Swal.fire({
          icon: "error",
          title: "Erro ao cadastrar!",
          text: err.message,
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
    loading,
    setName,
    setEmail,
    setPassword,
    onSubmit,
  };
}
