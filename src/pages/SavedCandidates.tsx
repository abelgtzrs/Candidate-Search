// src/pages/SavedCandidates.tsx

import { useState, useEffect } from "react";
import { ICandidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);

  useEffect(() => {
    // Retrieve the saved candidates (if any) from local storage
    const storedCandidates = localStorage.getItem("savedCandidates");
    if (storedCandidates) {
      setCandidates(JSON.parse(storedCandidates));
    }
  }, []);

  // If no saved candidates are found, display a message
  if (!candidates.length) {
    return (
      <>
        <h1>Potential Candidates</h1>
        <p>No candidates have been saved yet.</p>
      </>
    );
  }

  // Otherwise, render the list of saved candidates
  return (
    <>
      <h1>Potential Candidates</h1>
      {candidates.map((candidate) => (
        <div key={candidate.login} style={{ marginBottom: "1rem" }}>
          <img
            src={candidate.avatar_url}
            alt={`${candidate.login} avatar`}
            width="50"
            height="50"
          />
          <p>
            <strong>Name:</strong> {candidate.name || "N/A"}
          </p>
          <p>
            <strong>Username:</strong> {candidate.login}
          </p>
          <p>
            <strong>Location:</strong> {candidate.location || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {candidate.email || "N/A"}
          </p>
          <p>
            <strong>Company:</strong> {candidate.company || "N/A"}
          </p>
          <p>
            <strong>Profile:</strong>{" "}
            <a
              href={candidate.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {candidate.html_url}
            </a>
          </p>
        </div>
      ))}
    </>
  );
};

export default SavedCandidates;
