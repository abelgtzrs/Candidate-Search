# Candidate Search Application

## Description

This project is a React + TypeScript application that allows employers to browse random GitHub users as potential candidates for open positions. Users can accept or reject candidates, and accepted candidates are stored and displayed on a separate page. The application is built with Vite, retrieves user info with the GitHub API, and persists data in local storage.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [Features](#features)
4. [Deployed Link](#deployed-link)
5. [Screenshot](#screenshot)
6. [License](#license)
7. [Contributors and Questions](#contributors-and-questions)

## Installation

1. **Clone the Repo**

   ```bash
   git clone https://github.com/your-username/candidate-search.git
   cd candidate-search
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   This will install all required packages, including React, TypeScript, and React Router.

3. **Set Up Environment Variables**

   - Create a file named `.env` in the project root (or the appropriate environment folder if your Vite config is set to load from there).
   - Add your GitHub personal access token (fine-grained or classic) to `.env`:
     ```bash
     VITE_GITHUB_TOKEN=your_github_token_here
     ```
   - **Important**: Ensure the `.env` file is in `.gitignore` so your token is never committed to source control.

4. **Run the Development Server**
   ```bash
   npm run dev
   ```
   By default, the app is served at `http://localhost:5173/` (or the port shown in your console).

## Usage

1. **Home / Candidate Search**

   - On load, the application fetches a list of random GitHub users.
   - It displays one candidate at a time in a visually appealing “card” format with a large profile picture, basic user info (Name, Username, Location, Email, Company, Bio), and action buttons.
   - Click the **plus (+) button** to “accept” a candidate. This saves the candidate to local storage and moves on to the next candidate.
   - Click the **minus (-) button** to “reject” a candidate and move on without saving.

2. **Saved Candidates**
   - Navigate to the “Saved Candidates” page (via the navbar).
   - This page displays accepted candidates in a table format, including columns for Image, Name/Username, Location, Email, Company, and Bio.
   - Each row also has a minus button in a red circle to remove the candidate from the list if desired.
   - Data persists between page reloads using local storage.

## Features

- **Random Candidate Fetch**: Uses GitHub API to retrieve random sets of users.
- **Detailed API Fetch**: Fetches full profile info for each candidate (avatar, bio, etc.).
- **Accept/Reject Flow**: Simple UI for saving or discarding candidates.
- **Local Storage Persistence**: Saves data across reloads.
- **Saved Candidates Table**: Displays accepted candidates in a table, complete with images, profile links, and a remove option.

## Deployed Link

- [Candidate Search on Render](https://candidate-search-fjkq.onrender.com/)

## Screenshot

![Candidate Search](https://i.imgur.com/PSntXv3_d.webp)
![Potential Candidates](https://i.imgur.com/t0O43tD.png)

## License

Licensed under the [MIT License](https://opensource.org/licenses/MIT).
You are free to modify and distribute this software under the terms of the MIT license.

## Contributors and Questions

- [Abel Gutierrez](https://github.com/abelgtzrs)
- **Contact**: If you have questions, reach out via GitHub issues or email: [abelgtzrs](mailto:abelgtzrs@example.com)
