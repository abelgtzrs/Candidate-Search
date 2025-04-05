// TODO: Create an interface for the Candidate objects returned by the API
export interface ICandidate {
  login: string;
  name: string | null;
  location: string | null;
  avatar_url: string | null;
  email: string | null;
  html_url: string;
  company: string | null;
}
