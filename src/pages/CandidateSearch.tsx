import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { ICandidate } from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  //Holds list of minimal user objects from searchGithub
  const [randomUsers, setRandomUsers] = useState<Array<{ login: string }>>([]);
  //Index of the displayed user in randomusers
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  //Candidate fetched by seatchGithubUser
  const [candidate, setCandidate] = useState<ICandidate | null>(null);
  //Loading state
  const [loading, setLoading] = useState<boolean>(true);
  //Store accepted candidates
  const [savedCandidates, setSavedCandidates] = useState<ICandidate[]>(() => {
    const saved = localStorage.getItem("savedCandidates");
    return saved ? JSON.parse(saved) : [];
  });

  //Fetch a batch of random users
  useEffect(() => {
    const fetchRandomUser = async () => {
      setLoading(true);
      const users = await searchGithub();
      setRandomUsers(users);
      setLoading(false);
    };
    fetchRandomUser();
  }, []);

  useEffect(() => {
    if (randomUsers.length > 0 && currentIndex < randomUsers.length) {
      const currentLogin = randomUsers[currentIndex].login;
      fetchCandidateDetails(currentLogin);
    } else {
      setCandidate(null);
    }
  }, [randomUsers, currentIndex]);

  const fetchCandidateDetails = async (username: string) => {
    try {
      setLoading(true);
      const data = await searchGithubUser(username);
      setCandidate(data);
    } catch (error) {
      console.error("Error fetching candidate details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = () => {
    if (!candidate) return;
    const updated = [...savedCandidates, candidate];
    setSavedCandidates(updated);
    localStorage.setItem("savedCandidates", JSON.stringify(updated));
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  const handleReject = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  if (loading) {
    return <h2>Loading candidate...</h2>;
  }

  if (!candidate && currentIndex >= randomUsers.length) {
    return <h2>No more candidates available.</h2>;
  }

  if (!candidate) {
    return <h2>Loading candidate...</h2>;
  }

  return (
    <div>
      <h1>CandidateSearch</h1>
      <div>
        <img
          src={candidate.avatar_url || ""}
          alt={`${candidate.login} avatar`}
          width="100"
          height="100"
        />
      </div>
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
        <strong>Company:</strong> {candidate.company || "N/A"}
      </p>
      <p>
        <strong>Email:</strong> {candidate.email || "N/A"}
      </p>
      <p>
        <strong>Profile:</strong>{" "}
        <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
          {candidate.html_url}
        </a>
      </p>

      <div>
        <button onClick={handleAccept}>+</button>
        <button onClick={handleReject}>-</button>
      </div>
    </div>
  );
};

export default CandidateSearch;
