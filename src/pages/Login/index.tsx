import LoginUI from "./LoginUI";
import { useLogin } from "./useLogin";

export default function LoginPage() {
  const { email, password, loading, setEmail, setPassword, onSubmit } = useLogin();

  return (
    <LoginUI
      email={email}
      password={password}
      loading={loading}
      onEmail={setEmail}
      onPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
}
