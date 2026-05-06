import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../../Component/Navbar/Navbar";
import { useContext } from "react";
import { UserInfoContext } from "../../Context/UserInfo/UserInfoContextProvider";

const LayoutApp = () => {
  const { token } = useContext(UserInfoContext);

  console.log("Token in LayoutApp:", token);
  

  if (token != null) {
    return (
      <main className="min-h-screen">
        <Navbar />
        <Outlet />
      </main>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default LayoutApp;
