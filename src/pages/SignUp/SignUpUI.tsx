import { Link } from "react-router-dom";

type Props = {
  name: string;
  email: string;
  password: string;
  loading: boolean;
  onName: (v: string) => void;
  onEmail: (v: string) => void;
  onPassword: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
};

export default function SignUpUI({ name, email, password, loading, onName, onEmail, onPassword, onSubmit }: Props) {
  return (
    <main style={{ padding: 24, display: "grid", placeItems: "center" }}>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12, width: 320, maxWidth: "90vw" }}>
        <h1>Cadastrar</h1>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => onName(e.target.value)}
          disabled={loading}
        />

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

        <button type="submit" disabled={loading}>
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <small style={{ textAlign: "center" }}>
          <Link to="/">Voltar para login!</Link>
        </small>
      </form>
    </main>
  );
}
