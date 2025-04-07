// src/pages/CandidateSearch.tsx
import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { ICandidate } from "../interfaces/Candidate.interface";
import "../styles/CandidateSearch.css";

const CandidateSearch = () => {
  const [randomUsers, setRandomUsers] = useState<Array<{ login: string }>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [candidate, setCandidate] = useState<ICandidate | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Retrieve saved candidates from local storage
  const [savedCandidates, setSavedCandidates] = useState<ICandidate[]>(() => {
    const saved = localStorage.getItem("savedCandidates");
    return saved ? JSON.parse(saved) : [];
  });

  // On mount, fetch a batch of random GitHub users
  useEffect(() => {
    const fetchRandomUsers = async () => {
      setLoading(true);
      const users = await searchGithub();
      setRandomUsers(users);
      setLoading(false);
    };
    fetchRandomUsers();
  }, []);

  // Whenever randomUsers or currentIndex changes, fetch details for the current user
  useEffect(() => {
    if (randomUsers.length > 0 && currentIndex < randomUsers.length) {
      fetchCandidateDetails(randomUsers[currentIndex].login);
    } else {
      setCandidate(null);
    }
  }, [randomUsers, currentIndex]);

  // Fetch detailed info for a single user
  const fetchCandidateDetails = async (username: string) => {
    try {
      setLoading(true);
      const data = await searchGithubUser(username);

      // If user not found, skip to next
      if (!data || data.message === "Not Found") {
        setCurrentIndex((prevIndex) => prevIndex + 1);
        return;
      }

      setCandidate(data);
    } catch (error) {
      console.error("Error fetching candidate details:", error);
      // skip to next user on error
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } finally {
      setLoading(false);
    }
  };

  // Accept (save) candidate, move to next
  const handleAccept = () => {
    if (!candidate) return;
    const updated = [...savedCandidates, candidate];
    setSavedCandidates(updated);
    localStorage.setItem("savedCandidates", JSON.stringify(updated));
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Reject (don’t save) candidate, move to next
  const handleReject = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  if (loading) {
    return <h2>Loading candidate...</h2>;
  }

  // No more random users left
  if (!candidate && currentIndex >= randomUsers.length) {
    return <h2>No more candidates available.</h2>;
  }

  if (!candidate) {
    return <h2>Loading candidate...</h2>;
  }

  // Render the candidate info in a "card" style
  return (
    <div className="candidate-card">
      {/* Top: Large profile picture */}
      <div className="card-image-container">
        <img
          src={candidate.avatar_url || ""}
          alt={`${candidate.login} avatar`}
          className="card-image"
        />
      </div>

      {/* Middle: Primary info (big text), secondary info (small text) */}
      <div className="card-body">
        <h2 className="candidate-name">{candidate.name || "N/A"}</h2>
        <h3 className="candidate-username">{candidate.login}</h3>
        <p className="candidate-info">
          Location: {candidate.location || "N/A"}
        </p>
        <p className="candidate-info">Email: {candidate.email || "N/A"}</p>
        <p className="candidate-info">Company: {candidate.company || "N/A"}</p>
        <p className="candidate-info">
          Profile:{" "}
          <a
            href={candidate.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {candidate.html_url}
          </a>
        </p>
      </div>

      {/* Bottom: Buttons in circles */}
      <div className="card-actions">
        <button className="circle-button reject" onClick={handleReject}>
          -
        </button>
        <button className="circle-button accept" onClick={handleAccept}>
          +
        </button>
      </div>
    </div>
  );
};

export default CandidateSearch;
