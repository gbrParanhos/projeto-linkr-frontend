import { Link } from "react-router-dom";
import AuthLayout from "../../components/auth/layout";
import AuthHero from "../../components/auth/Hero";
import AuthFormShell from "../../components/auth/FormShell";
import AuthInput from "../../components/auth/Input";
import AuthSubmit from "../../components/auth/Submit";


export type Props = {
  email: string;
  password: string;
  loading: boolean;
  onEmail: (v: string) => void;
  onPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};


export default function LoginUI({ email, password, loading, onEmail, onPassword, onSubmit }: Props) {
  return (
    <AuthLayout hero={<AuthHero />}>
      <AuthFormShell>
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


          <AuthSubmit loading={loading} idleText="Entrar" loadingText="Entrando..." />


          <small className="text-center text-[15px] sm:text-[16px] font-lato text-white mt-2">
            Primeira vez?{" "}
            <Link to="/sign-up" className="font-lato text-white font-semibold hover:underline">
              Crie uma conta!
            </Link>
          </small>
        </form>
      </AuthFormShell>
    </AuthLayout>
  );
}