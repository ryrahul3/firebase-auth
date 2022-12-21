import Home from "./home";
import Login from "./login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { useState } from "react";

function App() {
  const [isAuthUser, setIsAuthUser] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setIsAuthUser(true);

      user.getIdToken(true).then((token) => {});
    } else {
      setIsAuthUser(false);
    }
  });
  return <>{isAuthUser ? <Home /> : <Login />}</>;
}

export default App;
