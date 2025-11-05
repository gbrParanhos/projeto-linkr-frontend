import { UserProvider } from "./contexts/UserContext";
import Router from "./router";
import "./styles/index.css";

const App = () => {
  return (
    <UserProvider>
      <Router />
    </UserProvider>
  );
};

export default App;
