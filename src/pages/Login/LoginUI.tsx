import { Link } from "react-router-dom";
import FormShell from "../../components/organisms/FormShell";
import AuthInput from "../../components/molecules/AuthInput";
import SubmitButton from "../../components/molecules/SubmitButton";



export type Props = {
  email: string;
  password: string;
  loading: boolean;
  onEmail: (value: string) => void;
  onPassword: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};


export default function LoginUI({ email, password, loading, onEmail, onPassword, onSubmit }: Props) {
  return (
    <FormShell>
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
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


        <SubmitButton loading={loading} idleText="Entrar" loadingText="Entrando..." />


        <small className="text-center text-[15px] sm:text-[16px] font-lato text-white mt-2">
          Primeira vez?{" "}
          <Link to="/sign-up" className="font-lato text-white font-semibold hover:underline">
            Crie uma conta!
          </Link>
        </small>
      </form>
    </FormShell>
  );
}