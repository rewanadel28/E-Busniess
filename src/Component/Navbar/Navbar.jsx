// React router dom
import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserInfoContext } from "../../Context/UserInfo/UserInfoContextProvider";

const Navbar = () => {
  const { token, removeToken } = useContext(UserInfoContext);
  return (
    <div className="navbar shadow-sm shadow-white">
      <div className="flex-1">
        <Link
          to={"/"}
          className="btn btn-ghost text-xl text-blue-700 dark:text-blue-300"
        >
          Linked Posts
        </Link>
      </div>

      {token ? (
        <div className="dropdown dropdown-end">
          <div
            tabIndex="0"
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex="0"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link className="justify-between">Profile</Link>
            </li>
            <li>
              <Link>Settings</Link>
            </li>
            <li>
              <button onClick={removeToken}>Logout</button>
            </li>
          </ul>
        </div>
      ) : (
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
            <li>
              <Link to={"/register"}>Register</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
