import { NavLink, Outlet } from "react-router-dom";
import "./Layout.css";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/projects", label: "Projects" },
  { to: "/writing", label: "Writing" },
  { to: "/photography", label: "Photography" },
  // { to: "/board-games", label: "Board Games" }, // temporarily disabled
];

export default function Layout() {
  return (
    <div className="site-layout">
      <nav className="site-nav">
        <ul>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => (isActive ? "active" : "")}
                end={item.to === "/"}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <main className="site-content">
        <Outlet />
      </main>
    </div>
  );
}
