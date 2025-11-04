type Props = {
  onLogout: () => void;
};

export default function FeedUI({ onLogout }: Props) {
  return (
    <button className="bg-white" onClick={onLogout}>Sair</button>
  );
}
