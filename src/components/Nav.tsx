// src/components/Nav.tsx
import { FC } from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css"; // Import the CSS file

const Nav: FC = () => {
  return (
    <nav className="navbar">
      <h1 className="navbar-brand">Candidate Search</h1>
      <ul className="navbar-links">
        <li>
          <Link to="/">Search</Link>
        </li>
        <li>
          <Link to="/SavedCandidates">Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
