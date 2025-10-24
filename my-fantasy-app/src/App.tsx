// App.jsx
// Single-file React (React Native Web compatible) starter for a Fantasy Football League website.
// Notes:
// - This file assumes you're using a bundler set up with Tailwind CSS enabled (recommended: Vite or Create React App with Tailwind).
// - Uses React Router for navigation. Install: react, react-dom, react-router-dom, tailwindcss configured.
// - You can adapt components to React Native Web by replacing DOM elements with react-native primitives.

import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

// Example dataset: each team has historical seasons with records
const TEAMS = [
  {
    id: "jonny",
    name: "The Pillar Bois",
    owner: "Jonny Schuller",
    logo: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/JonnyLogo2025RedAndWhite.png",
    history: [
      { season: 2021, wins: 8, losses: 5, ties: 0, place: 2 },
      { season: 2022, wins: 10, losses: 3, ties: 0, place: 1 },
      { season: 2023, wins: 7, losses: 6, ties: 0, place: 3 },
    ],
  },
  {
    id: "nate",
    name: "Schlong John Silver's",
    owner: "Nate Parks",
    logo: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/NateMaroon_star.png",
    history: [
      { season: 2021, wins: 5, losses: 8, ties: 0, place: 7 },
      { season: 2022, wins: 6, losses: 7, ties: 0, place: 5 },
      { season: 2023, wins: 9, losses: 4, ties: 0, place: 2 },
    ],
  },
  {
    id: "dallas",
    name: "Clappin Cheeks",
    owner: "Dallas Pesch",
    logo: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/Logo-DallastransParant.png",
    history: [
      { season: 2021, wins: 11, losses: 2, ties: 0, place: 1 },
      { season: 2022, wins: 4, losses: 9, ties: 0, place: 8 },
      { season: 2023, wins: 8, losses: 5, ties: 0, place: 4 },
    ],
  },
  {
    id: "jake",
    name: "Gone & Forgotten",
    owner: "Jake Pankey",
    logo: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/logo-jake-new-white.png",
    history: [
      { season: 2021, wins: 11, losses: 2, ties: 0, place: 1 },
      { season: 2022, wins: 4, losses: 9, ties: 0, place: 8 },
      { season: 2023, wins: 8, losses: 5, ties: 0, place: 4 },
    ],
  },
  {
    id: "drake",
    name: "Jonny's Sins",
    owner: "Drake Vandenburg",
    logo: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/DrakeNewLogoBig.png",
    history: [
      { season: 2021, wins: 11, losses: 2, ties: 0, place: 1 },
      { season: 2022, wins: 4, losses: 9, ties: 0, place: 8 },
      { season: 2023, wins: 8, losses: 5, ties: 0, place: 4 },
    ],
  },
  {
    id: "paul",
    name: "The Dallzers",
    owner: "Paul Ingle",
    logo: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/logo-paul-new.png",
    history: [
      { season: 2021, wins: 11, losses: 2, ties: 0, place: 1 },
      { season: 2022, wins: 4, losses: 9, ties: 0, place: 8 },
      { season: 2023, wins: 8, losses: 5, ties: 0, place: 4 },
    ],
  },
  {
    id: "pat",
    name: "Scumbags of Sleazeville",
    owner: "Pat Isho",
    logo: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/Logo-Pat-Transparent.png",
    history: [
      { season: 2021, wins: 11, losses: 2, ties: 0, place: 1 },
      { season: 2022, wins: 4, losses: 9, ties: 0, place: 8 },
      { season: 2023, wins: 8, losses: 5, ties: 0, place: 4 },
    ],
  },
  {
    id: "blake",
    name: "The Astechings",
    owner: "Blake Mazur",
    logo: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/new-logo-Blake.png",
    history: [
      { season: 2021, wins: 11, losses: 2, ties: 0, place: 1 },
      { season: 2022, wins: 4, losses: 9, ties: 0, place: 8 },
      { season: 2023, wins: 8, losses: 5, ties: 0, place: 4 },
    ],
  },
  {
    id: "ox",
    name: "The Ox Stampedes",
    owner: "Mike Oxlong",
    logo: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/OxLogoWithotWords.png",
    history: [
      { season: 2021, wins: 11, losses: 2, ties: 0, place: 1 },
      { season: 2022, wins: 4, losses: 9, ties: 0, place: 8 },
      { season: 2023, wins: 8, losses: 5, ties: 0, place: 4 },
    ],
  },
  {
    id: "derek",
    name: "Reasons to Live",
    owner: "Derek Mozden",
    logo: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/Logo-Derek-Full-new.png",
    history: [
      { season: 2021, wins: 11, losses: 2, ties: 0, place: 1 },
      { season: 2022, wins: 4, losses: 9, ties: 0, place: 8 },
      { season: 2023, wins: 8, losses: 5, ties: 0, place: 4 },
    ],
  },
];

function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-indigo-400 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Fantasy League — Historical Records</h1>
        <nav className="space-x-3">
          <Link to="/" className="px-3 py-2 rounded hover:bg-indigo-500/70">Home</Link>
          <Link to="/teams" className="px-3 py-2 rounded hover:bg-indigo-500/70">Teams</Link>
        </nav>
      </div>
    </header>
  );
}

function Home() {
  return (
    <main className="container mx-auto p-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-2">Welcome Commissioner</h2>
        <p className="mb-4">This small app lists each team's historical season records. Click "Teams" to see the list or search for a team by its ID.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TEAMS.map((t) => (
            <Link key={t.id} to={`/team/${t.id}`} className="p-4 border rounded hover:shadow">
              <img class="h-48 w-96 object-contain" src={t.logo}/>
              <div className="font-bold">{t.name}</div>
              <div className="text-sm text-gray-600">Owner: {t.owner}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}

function TeamsList() {
  return (
    <main className="container mx-auto p-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Teams</h2>
        <ul className="space-y-3">
          {TEAMS.map((team) => (
            <li key={team.id} className="flex items-center justify-between p-3 border rounded">
              <div className="flex items-center gap-3">
		            <img class="h-48 w-96 object-contain" src={team.logo}/>
                <div>
                  <div className="font-semibold">{team.name}</div>
                  <div className="text-sm text-gray-600">Owner: {team.owner}</div>
                </div>
              </div>
              <Link to={`/team/${team.id}`} className="px-3 py-1 rounded bg-indigo-600 text-white">View</Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

function TeamPage() {
  const { id } = useParams();
  const team = TEAMS.find((t) => t.id === id);

  if (!team) {
    return (
      <main className="container mx-auto p-6">
        <div className="bg-white rounded-2xl p-6 shadow-md">
          <h2 className="text-xl font-semibold">Team not found</h2>
          <p className="mt-2">Double-check the team ID or go back to the teams list.</p>
        </div>
      </main>
    );
  }

  const totalWins = team.history.reduce((s, r) => s + r.wins, 0);
  const totalLosses = team.history.reduce((s, r) => s + r.losses, 0);

  return (
    <main className="container mx-auto p-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-4">
          <div><img class="h-48 w-96 object-contain" src={team.logo}/></div>
          <div>
            <h2 className="text-2xl font-bold">{team.name}</h2>
            <div className="text-sm text-gray-600">Owner: {team.owner}</div>
            <div className="text-sm text-gray-600 mt-1">All-time (shown seasons): {totalWins}–{totalLosses}</div>
          </div>
        </div>

        <div className="mt-6">
          <h3 className="font-semibold">Season-by-season</h3>
          <table className="w-full mt-3 table-auto border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Season</th>
                <th>W</th>
                <th>L</th>
                <th>T</th>
                <th>Place</th>
              </tr>
            </thead>
            <tbody>
              {team.history.map((h) => (
                <tr key={h.season} className="border-b">
                  <td className="py-2">{h.season}</td>
                  <td>{h.wins}</td>
                  <td>{h.losses}</td>
                  <td>{h.ties}</td>
                  <td>{h.place}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex gap-3">
          <Link to="/teams" className="px-4 py-2 rounded border">Back to teams</Link>
          <button
            onClick={() => navigator.clipboard.writeText(window.location.href)}
            className="px-4 py-2 rounded bg-indigo-600 text-white"
          >
            Copy link
          </button>
        </div>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<TeamsList />} />
          <Route path="/team/:id" element={<TeamPage />} />
          <Route path="*" element={<main className="container mx-auto p-6"><div className="bg-white p-6 rounded">404 — Not Found</div></main>} />
        </Routes>
        <footer className="text-center p-4 text-sm text-gray-500">Fantasy League Manager • Generated App</footer>
      </div>
    </Router>
  );
}

/*
  Quick setup notes (not included in the code above):
  1) Create a project (Vite recommended):
     npm create vite@latest my-fantasy-app --template react
     cd my-fantasy-app
  2) Install dependencies:
     npm install react-router-dom
  3) Install and configure Tailwind CSS following the official guide.
  4) Replace src/App.jsx with this file. Ensure index.css imports Tailwind directives.
  5) Run locally: npm run dev

  To adapt to React Native Web / Expo-managed workflow, place components into .native.js/.web.js splits and configure expo for web.
*/
