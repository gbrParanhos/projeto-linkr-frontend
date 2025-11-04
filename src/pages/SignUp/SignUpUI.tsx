import { Link } from "react-router-dom";
import FormShell from "../../components/organisms/FormShell/index.tsx";
import AuthInput from "../../components/molecules/AuthInput/index.tsx";
import SubmitButton from "../../components/molecules/SubmitButton/index.tsx";


export type Props = {
  name: string;
  email: string;
  password: string;
  photo: string;
  loading: boolean;
  onName: (v: string) => void;
  onEmail: (v: string) => void;
  onPassword: (v: string) => void;
  onPhoto: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};


export default function SignUpUI({
  name,
  email,
  password,
  photo,
  loading,
  onName,
  onEmail,
  onPassword,
  onPhoto,
  onSubmit,
}: Props) {
  return (
    <FormShell>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <AuthInput
          type="text"
          placeholder="nome"
          value={name}
          onChange={(e) => onName(e.target.value)}
          disabled={loading}
        />


        <AuthInput
          type="url"
          placeholder="foto (URL)"
          value={photo}
          onChange={(e) => onPhoto(e.target.value)}
          disabled={loading}
        />


        <AuthInput
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => onEmail(e.target.value)}
          disabled={loading}
        />


        <AuthInput
          type="password"
          placeholder="senha"
          value={password}
          onChange={(e) => onPassword(e.target.value)}
          disabled={loading}
        />


        <SubmitButton loading={loading} idleText="Cadastrar" loadingText="Cadastrando..." />


        <small className="text-center text-[15px] sm:text-[16px] font-lato text-white mt-2">
          Já tem uma conta?{" "}
          <Link to="/" className="font-lato text-white font-semibold hover:underline">
            Entrar
          </Link>
        </small>
      </form>
    </FormShell>
  );
}