import { Link } from "react-router-dom";

type Props = {
  email: string;
  password: string;
  loading: boolean;
  onEmail: (v: string) => void;
  onPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function LoginUI({ email, password, loading, onEmail, onPassword, onSubmit }: Props) {
  return (
    <main style={{ padding: 24, display: "grid", placeItems: "center" }}>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, width: 320, maxWidth: "90vw" }}>
        <h1>Entrar</h1>

        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => onEmail(e.target.value)}
          disabled={loading}
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => onPassword(e.target.value)}
          disabled={loading}
        />

        <button type="submit" disabled={loading} aria-disabled={loading} aria-busy={loading}>
          {loading ? "Entrando..." : "Entrar"}
        </button>

        <small style={{ textAlign: "center" }}>
          Primeira vez? <Link to="/sign-up">Crie uma conta!</Link>
        </small>
      </form>
    </main>
  );
}
