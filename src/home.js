import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function Home() {
  const user = auth.currentUser;
  const handleLogOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div className="login">
        <img
          referrerPolicy="no-referrer"
          src={user?.photoURL ?? "assets/man_smoke.jpg"}
          alt=""
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; 
            currentTarget.src = "assets/man_smoke.jpg";
          }}
        />

        <div className="btnContainer">
          <div className="flex" style={{ textAlign: "center" }}>
            {user?.displayName}
            <small>{user?.email}</small>
          </div>

          <button
            className="themeBtn"
            style={{ marginBottom: "10px", marginTop: "5px" }}
            onClick={handleLogOut}
          >
            Log Out
          </button>
        </div>
      </div>
    </>
  );
}
