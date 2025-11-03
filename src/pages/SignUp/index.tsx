import SignUpUI from "./SignUpUI";
import { useSignUp } from "./useSignUp";

export default function SignUpPage() {
  const { name, email, password, loading, setName, setEmail, setPassword, onSubmit } = useSignUp();

  return (
    <SignUpUI
      name={name}
      email={email}
      password={password}
      loading={loading}
      onName={setName}
      onEmail={setEmail}
      onPassword={setPassword}
      onSubmit={onSubmit}
    />
  );
}
