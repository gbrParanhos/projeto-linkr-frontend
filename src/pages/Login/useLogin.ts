import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../services/authService";
import Swal from "sweetalert2";

export function useLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      await Swal.fire({
        icon: "warning",
        title: "Campos obrigatórios",
        text: "Preencha o email e a senha para continuar.",
      });
      return;
    }

    try {
      setLoading(true);
      const { token } = await loginRequest(email, password);
      localStorage.setItem("auth_token", token);
      await Swal.fire({
        icon: "success",
        title: "Login realizado!",
        text: "Você será redirecionado ao feed.",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/feed");
    } catch (err: unknown) {
      if (err instanceof Error && err.message === "INVALID_CREDENTIALS") {
        Swal.fire({
          icon: "error",
          title: "Credenciais inválidas",
          text: "Email ou senha incorretos.",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Erro ao fazer login",
          text: "Não foi possível fazer login. Tente novamente.",
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    email,
    password,
    loading,
    setEmail,
    setPassword,
    onSubmit,
  };
}
