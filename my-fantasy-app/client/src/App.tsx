// App.jsx
// Single-file React (React Native Web compatible) starter for a Fantasy Football League website.
// Notes:
// - This file assumes you're using a bundler set up with Tailwind CSS enabled (recommended: Vite or Create React App with Tailwind).
// - Uses React Router for navigation. Install: react, react-dom, react-router-dom, tailwindcss configured.
// - You can adapt components to React Native Web by replacing DOM elements with react-native primitives.

import React, {useEffect, useState} from "react";
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
    championships:[
      {year: 2019, banner: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/2020JonnyChampionshipBanner.png"}
    ],
    active:1
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
    championships:[
      {year: 2020, banner: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/2021NateChampionshipBanner.png"}
    ],
    active:1
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
    championships:[
      {year: 2024, banner: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/2024DallasChampionshipBanner.png"}
    ],
    active:1
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
    championships:[
      {year: 2022, banner: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/2022JakeChampionshipBanner.png"},
      {year: 2023, banner: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/2023JakeChampionshipBanner.png"}
    ],
    active:1
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
    championships:[
      {year: 2019, banner: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/DrakeChampionshipBanner.png"}
    ],
    active:1
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
    championships:[],
    active:1
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
    championships:[],
    active:1
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
    championships:[],
    active:1
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
    championships:[],
    active:1
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
    championships:[],
    active:1
  },
  {
    id: "axel",
    name: "Green Bay Fackers",
    owner: "Axel Ayala",
    logo: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/Logo-Axel-Transparent.png",
    history: [
      { season: 2021, wins: 8, losses: 5, ties: 0, place: 2 },
      { season: 2022, wins: 10, losses: 3, ties: 0, place: 1 },
      { season: 2023, wins: 7, losses: 6, ties: 0, place: 3 },
    ],
    championships:[],
    active:0
  },
  {
    id: "jonk",
    name: "Recalcitrant Rookie",
    owner: "Jonathan Kowalski",
    logo: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/logo-jonk.png",
    history: [
      { season: 2021, wins: 8, losses: 5, ties: 0, place: 2 },
      { season: 2022, wins: 10, losses: 3, ties: 0, place: 1 },
      { season: 2023, wins: 7, losses: 6, ties: 0, place: 3 },
    ],
    championships:[],
    active:0
  },
  {
    id: "nick",
    name: "Belichick's Bookie",
    owner: "Nick Hurt",
    logo: "https://monitoring-redefined-league-assets.s3.us-east-1.amazonaws.com/Logo-Nick.png",
    history: [
      { season: 2021, wins: 8, losses: 5, ties: 0, place: 2 },
      { season: 2022, wins: 10, losses: 3, ties: 0, place: 1 },
      { season: 2023, wins: 7, losses: 6, ties: 0, place: 3 },
    ],
    championships:[],
    active:0
  },
];

function Header() {
  return (
    <header className="bg-gradient-to-r from-emerald-600 to-gray-400 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-2xl font-bold">Monitoring Redefined</h1>
        <nav className="space-x-3">
          <Link to="/" className="px-3 py-2 rounded hover:bg-indigo-500/70 text-color-white">Home</Link>
          <Link to="/teams" className="px-3 py-2 rounded hover:bg-indigo-500/70 text-color-white">Teams</Link>
          <Link to="/records/matchups" className="px-3 py-2 rounded hover:bg-indigo-500/70 text-color-white">Matchup Records</Link>
          <Link to="/allmatchups" className="px-3 py-2 rounded hover:bg-indigo-500/70 text-color-white">All Matchups Log</Link> 
        </nav>
      </div>
    </header>
  );
}

function AllMatchups() {
    const [teamInfo, setTeamInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeamInfo() {
      fetch("http://184.72.214.123:5000/api/matchups")
        .then(response=> response.json())
        .then(resJSON => {
          console.log(resJSON);
          setTeamInfo(resJSON);
          setLoading(false);

        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        })

    }
    fetchTeamInfo();
  }, []);

  if (loading) return <main className="p-6 text-center">Loading team info...</main>;

  return (
    <main className="container mx-auto p-6 bg-white">
      <div className="rounded-2xl p-6 shadow-md">
        {
          teamInfo.map((m) => (
            <div className="font-bold text-black">Week {m.week}, {m.year} - {m.winningTeam} beat {m.losingTeam} with a score of {m.winningTeamPoints} to {m.losingTeamPoints}</div>
          ))
        }
      </div>
    </main>
  );
}

function Home() {



  return (
    
    <main className="container mx-auto p-6 bg-white">
      <div className="rounded-2xl p-6 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {TEAMS.map((t) => 
          (
            <div className={`p-4 border border-emerald-500 rounded hover:shadow-xl ${t.active ? "" : "bg-gray-200"}`}>
            <Link key={t.id} to={`/team/${t.id}`} >
              <img className={`h-48 w-96 object-contain drop-shadow-xl/50 ${t.active ? "" : "grayscale-75"}`} src={t.logo}/>
              <div className={`font-bold${t.active ? "" : "text-gray-600"}`}>{t.name}</div>
              <div className="text-sm text-gray-600">Owner: {t.owner}</div>
            </Link>
            </div>
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
		            <img class="h-48 w-96 object-contain drop-shadow-xl/50" src={team.logo}/>
                <div>
                  <div className="font-semibold">{team.name}</div>
                  <div className="text-sm text-gray-600">Owner: {team.owner}</div>
                </div>
              </div>
              <div>
                <Link to={`/team/${team.id}`} className="px-3 py-1 rounded bg-indigo-600 text-white">View</Link>
              </div>
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

  const [teamInfo, setTeamInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchTeamInfo() {
      fetch("http://184.72.214.123:5000/api/team/?team=" + team.id)
        .then(response=> response.json())
        .then(resJSON => {
          let yearRecords = {};
          let vsRecords = {};
          let totalRecord = {wins: 0, losses:0};
          let playoffRecord = {wins: 0, losses: 0};
          for (let i = 0; i < resJSON.length; i++){
         
            if (resJSON[i].winningTeam == team.id){
              //adding totalRecord
              totalRecord['wins']++;

              if(resJSON[i].isPlayoffs){
                playoffRecord.wins++;
              }

              //adding yearRecords data
              if(resJSON[i].year in yearRecords){
                yearRecords[resJSON[i].year]["wins"]++;
              } else {
                yearRecords[resJSON[i].year] = {wins: 1, losses: 0};
              }
              //adding vsRecords data
              if(resJSON[i].losingTeam in vsRecords){
                vsRecords[resJSON[i].losingTeam]["wins"] ++;
              } else {
                vsRecords[resJSON[i].losingTeam] = {wins: 1, losses: 0}
              }
            } else {
              //adding totalRecord
              totalRecord['losses']++;

              if(resJSON[i].isPlayoffs){
                playoffRecord.losses++;
              }
              //adding yearRecords data
              if(resJSON[i].year in yearRecords){
                yearRecords[resJSON[i].year]["losses"]++;
              } else {
                yearRecords[resJSON[i].year] = {wins: 0, losses: 1};
              }
              //adding vsRecords data
              if(resJSON[i].winningTeam in vsRecords){
                vsRecords[resJSON[i].winningTeam]["losses"]++;
              } else {
                vsRecords[resJSON[i].winningTeam] = {wins: 0, losses: 1}
              }
            }

          }
          setTeamInfo({yearRecords: yearRecords, vsRecords: vsRecords, totalRecord: totalRecord, playoffRecord: playoffRecord});
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        })

    }
    fetchTeamInfo();
  }, []);


  const fake_team = fake_teams.find((t) => t.id === id);



  const totalWins = team.history.reduce((s, r) => s + r.wins, 0);
  const totalLosses = team.history.reduce((s, r) => s + r.losses, 0);

  if (loading) return <main className="p-6 text-center">Loading team info...</main>;

  return (
    <main className="container mx-auto p-6">
      <div className="bg-white rounded-2xl p-6 shadow-md">
        {/* {
          teamInfo.map((m) => (
            <div className="font-bold text-black">Week {m.week}, {m.year} - {m.winningTeam} beat {m.losingTeam} with a score of {m.winningTeamPoints} to {m.losingTeamPoints}</div>
          ))
        } */}
        <div className="flex items-center gap-4">
          <div><img className="h-48 w-96 object-contain" src={team.logo}/></div>
          <div>
            <h2 className="text-2xl font-bold">{team.name}</h2>
            <div className="text-sm text-gray-600">Owner: {team.owner}</div>
            <div className="text-sm text-gray-600 mt-1">All-time (Playoffs): {teamInfo.totalRecord.wins}–{teamInfo.totalRecord.losses} ({teamInfo.playoffRecord.wins}-{teamInfo.playoffRecord.losses})</div>
          </div>
        </div>

        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <h3 className="font-semibold">Season-by-season</h3>
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Season
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    W
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    L
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(teamInfo.yearRecords).map(([year, rec]) => {
                return (
                <tr key={year} className="hover:bg-slate-50">
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800 ">{year}</p></td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800 ">{rec.wins}</p></td>
                  <td className="p-4 border-b border-slate-200">
                    <p className="block text-sm text-slate-800 ">{rec.losses}</p>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>

        <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <h3 className="font-semibold">Records vs. Every Other Team</h3>
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Logo
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Opponent
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    W
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    L
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(teamInfo.vsRecords).map(([oppId, rec]) => {
                const opp = TEAMS.find((t) => t.id === oppId);
                return (
                  <tr key={oppId} className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-18 max-w-18">
                        <img className="object-scale-down max-h-16 max-w-16 drop-shadow-xl/50 inline" src={opp.logo}/>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {opp ? opp.name : oppId}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {rec.wins}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {rec.losses}
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })}
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

function RecordsMatchupPage() {

  const [matchupInfo, setMatchupInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTeamInfo() {
      fetch("http://184.72.214.123:5000/api/records/matchup")
        .then(response=> response.json())
        .then(resJSON => {
          
          

          console.log(resJSON);
          setMatchupInfo(resJSON);
          setLoading(false);

        })
        .catch(error => {
          console.error('Error fetching data:', error);
          setLoading(false);
        })

    }
    fetchTeamInfo();
  }, []);

  if (loading) return <main className="p-6 text-center">Loading team info...</main>;

  return (
    <main className="container mx-auto p-6">
      <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
          <h3 className="font-semibold">Biggest Blowouts</h3>
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Year
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Week
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Winning Team
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">                     
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Losing Team
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">                     
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Winning Team's Score
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Losing Team's Score
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Point Differential
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(matchupInfo.blowout).map(([m]) => {
                
                let cm = matchupInfo.blowout[m];
                const winningTeam = TEAMS.find((t) => t.id === cm.winningTeam);
                const losingTeam = TEAMS.find((t) => t.id === cm.losingTeam);
                return (
                  <tr key={m + 1} className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-18 max-w-18">
                        <p className="block text-sm text-slate-800">
                          {cm.year}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.week}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <img className="object-scale-down max-h-12 max-w-12 drop-shadow-xl/50 inline" src={winningTeam.logo}/>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {winningTeam.name}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <img className="object-scale-down max-h-12 max-w-12 drop-shadow-xl/50 inline" src={losingTeam.logo}/>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {losingTeam.name}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.winningTeamPoints}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.losingTeamPoints}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.point_diff}
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h3 className="font-semibold">Closest Matchups</h3>
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Year
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Week
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Winning Team
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">                     
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Losing Team
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">                     
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Winning Team's Score
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Losing Team's Score
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Point Differential
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(matchupInfo.closest).map(([m]) => {
                
                let cm = matchupInfo.closest[m];
                const winningTeam = TEAMS.find((t) => t.id === cm.winningTeam);
                const losingTeam = TEAMS.find((t) => t.id === cm.losingTeam);
                return (
                  <tr key={m + 1} className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-18 max-w-18">
                        <p className="block text-sm text-slate-800">
                          {cm.year}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.week}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <img className="object-scale-down max-h-12 max-w-12 drop-shadow-xl/50 inline" src={winningTeam.logo}/>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {winningTeam.name}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <img className="object-scale-down max-h-12 max-w-12 drop-shadow-xl/50 inline" src={losingTeam.logo}/>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {losingTeam.name}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.winningTeamPoints}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.losingTeamPoints}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.point_diff}
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h3 className="font-semibold">Highest Total Points Matchups</h3>
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Year
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Week
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Winning Team
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">                     
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Losing Team
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">                     
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Winning Team's Score
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Losing Team's Score
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Point Total
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(matchupInfo.highest).map(([m]) => {
                
                let cm = matchupInfo.highest[m];
                const winningTeam = TEAMS.find((t) => t.id === cm.winningTeam);
                const losingTeam = TEAMS.find((t) => t.id === cm.losingTeam);
                return (
                  <tr key={m + 1} className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-18 max-w-18">
                        <p className="block text-sm text-slate-800">
                          {cm.year}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.week}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <img className="object-scale-down max-h-12 max-w-12 drop-shadow-xl/50 inline" src={winningTeam.logo}/>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {winningTeam.name}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <img className="object-scale-down max-h-12 max-w-12 drop-shadow-xl/50 inline" src={losingTeam.logo}/>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {losingTeam.name}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.winningTeamPoints}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.losingTeamPoints}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.point_total}
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <h3 className="font-semibold">Lowest Total Points Matchups</h3>
          <table className="w-full text-left table-auto min-w-max">
            <thead>
              <tr>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Year
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Week
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Winning Team
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">                     
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Losing Team
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">                     
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Winning Team's Score
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Losing Team's Score
                  </p>
                </th>
                <th className="p-4 border-b border-slate-300 bg-slate-50">
                  <p className="block text-sm font-normal leading-none text-slate-500">
                    Point Total
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(matchupInfo.lowest).map(([m]) => {
                
                let cm = matchupInfo.lowest[m];
                const winningTeam = TEAMS.find((t) => t.id === cm.winningTeam);
                const losingTeam = TEAMS.find((t) => t.id === cm.losingTeam);
                return (
                  <tr key={m + 1} className="hover:bg-slate-50">
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-18 max-w-18">
                        <p className="block text-sm text-slate-800">
                          {cm.year}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.week}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <img className="object-scale-down max-h-12 max-w-12 drop-shadow-xl/50 inline" src={winningTeam.logo}/>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {winningTeam.name}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <img className="object-scale-down max-h-12 max-w-12 drop-shadow-xl/50 inline" src={losingTeam.logo}/>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {losingTeam.name}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.winningTeamPoints}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.losingTeamPoints}
                        </p>
                      </div>
                    </td>
                    <td className="p-4 border-b border-slate-200">
                      <div className="max-h-24 overflow-y-auto">
                        <p className="block text-sm text-slate-800">
                          {cm.point_total}
                        </p>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen min-w-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/teams" element={<TeamsList />} />
          <Route path="/team/:id" element={<TeamPage />} />
          <Route path="/records/matchups" element={<RecordsMatchupPage />} />
          <Route path="/allmatchups" element={<AllMatchups />} />
          <Route path="*" element={<main className="container mx-auto p-6"><div className="bg-white p-6 rounded">404 — Not Found</div></main>} />
        </Routes>
        <footer className="text-center p-4 text-sm text-gray-500">Monitoring Redefined</footer>
      </div>
    </Router>
  );
}

