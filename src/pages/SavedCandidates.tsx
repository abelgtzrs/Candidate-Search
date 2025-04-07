import { useEffect, useState } from "react";
import { ICandidate } from "../interfaces/Candidate.interface";
import "../styles/SavedCandidates.css";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("savedCandidates");
    if (stored) {
      setCandidates(JSON.parse(stored));
    }
  }, []);

  const handleReject = (login: string) => {
    const updated = candidates.filter((candidate) => candidate.login !== login);
    setCandidates(updated);
    localStorage.setItem("savedCandidates", JSON.stringify(updated));
  };

  if (!candidates.length) {
    return (
      <div>
        <h1>Potential Candidates</h1>
        <p>No candidates have been saved yet.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Potential Candidates</h1>

      <table className="candidate-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name (Username)</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => (
            <tr key={candidate.login}>
              <td>
                <img
                  src={candidate.avatar_url || ""}
                  alt={candidate.login}
                  width="50"
                  height="50"
                />
              </td>
              <td>
                {candidate.name || "N/A"} (
                <a
                  href={candidate.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {candidate.login}
                </a>
                )
              </td>
              <td>{candidate.location || "N/A"}</td>
              <td>{candidate.email || "N/A"}</td>
              <td>{candidate.company || "N/A"}</td>
              <td>{candidate.bio || "N/A"}</td>
              <td>
                <button
                  className="reject-button"
                  onClick={() => handleReject(candidate.login)}
                >
                  -
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCandidates;
