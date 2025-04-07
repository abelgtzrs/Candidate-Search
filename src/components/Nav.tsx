import { FC } from "react";
import { Link } from "react-router-dom";

const Nav: FC = () => {
  return (
    <nav>
      <h1>Candidate Search</h1>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/">Search Candidates</Link>
        </li>
        <li>
          <Link to="/SavedCandidates">Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
