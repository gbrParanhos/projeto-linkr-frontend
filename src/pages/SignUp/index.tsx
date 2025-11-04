import SignUpUI from "./SignUpUI";
import { useSignUp } from "./useSignUp";

export default function SignUpPage() {
  const { name, email, password, loading, photo, setName, setEmail, setPassword, onSubmit, setPhoto } = useSignUp();

  return (
    <SignUpUI
      name={name}
      email={email}
      password={password}
      photo={photo}
      loading={loading}
      onName={setName}
      onEmail={setEmail}
      onPassword={setPassword}
      onPhoto={setPhoto}
      onSubmit={onSubmit}
    />
  );
}
