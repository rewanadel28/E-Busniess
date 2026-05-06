// React router dom
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout
import LayoutApp from "./Layout/LayoutApp/LayoutApp";

// Pages
import NotFound from "./Pages/NotFound/NotFound";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import UserInfoContextProvider from "./Context/UserInfo/UserInfoContextProvider";

// Component
import { Toaster } from "react-hot-toast";

const App = () => {
  const Router = createBrowserRouter([
    {
      path: "",
      element: <LayoutApp />,
      children: [{ index: true, element: <Home /> }],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <NotFound /> },
  ]);
  return (
    <UserInfoContextProvider className="bg-white dark:bg-black ">
      {/* The Toaster component is used to display notifications */}
      <Toaster position="top-center" reverseOrder={false} />
      {/* Router */}
      <RouterProvider router={Router} />
    </UserInfoContextProvider>
  );
};

export default App;
