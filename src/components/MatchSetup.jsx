import { useState } from 'react';

const GAMES = [
  { key: 'chess', name: 'Chess' },
  { key: 'tictactoe', name: 'Tic-Tac-Toe' },
  { key: 'quiz', name: 'Quiz' },
];

export default function MatchSetup({ onStartMatch, onCancel }) {
  const [team1, setTeam1] = useState('Team A');
  const [team2, setTeam2] = useState('Team B');
  const [pick1, setPick1] = useState(null);
  const [pick2, setPick2] = useState(null);

  const canStart = team1.trim() && team2.trim() && pick1 && pick2 && pick1 !== pick2;

  const submit = () => {
    if (!canStart) return;
    onStartMatch({ team1, team2 }, { team1: pick1, team2: pick2 });
  };

  return (
    <section className="max-w-5xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6">Match Setup</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-neutral-300">Team 1 Name</span>
            <input
              className="mt-1 w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
              value={team1}
              onChange={(e) => setTeam1(e.target.value)}
              maxLength={24}
              aria-label="Team 1 name"
            />
          </label>
          <div>
            <span className="text-sm text-neutral-300">Team 1 Picks</span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {GAMES.map((g) => (
                <button
                  key={`t1-${g.key}`}
                  onClick={() => setPick1(g.key)}
                  className={`px-3 py-2 rounded-md border ${pick1 === g.key ? 'bg-indigo-600 border-indigo-500' : 'bg-neutral-900 border-neutral-700 hover:border-neutral-500'}`}
                  aria-pressed={pick1 === g.key}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm text-neutral-300">Team 2 Name</span>
            <input
              className="mt-1 w-full rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
              value={team2}
              onChange={(e) => setTeam2(e.target.value)}
              maxLength={24}
              aria-label="Team 2 name"
            />
          </label>
          <div>
            <span className="text-sm text-neutral-300">Team 2 Picks</span>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {GAMES.map((g) => (
                <button
                  key={`t2-${g.key}`}
                  onClick={() => setPick2(g.key)}
                  className={`px-3 py-2 rounded-md border ${pick2 === g.key ? 'bg-fuchsia-600 border-fuchsia-500' : 'bg-neutral-900 border-neutral-700 hover:border-neutral-500'}`}
                  aria-pressed={pick2 === g.key}
                >
                  {g.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-neutral-400">Each team must pick a different game. The two chosen games will be played, one after the other.</p>

      <div className="mt-8 flex gap-3">
        <button onClick={onCancel} className="px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700">Cancel</button>
        <button
          onClick={submit}
          disabled={!canStart}
          className={`px-4 py-2 rounded-md font-medium ${canStart ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-neutral-800 cursor-not-allowed'}`}
        >
          Start Match
        </button>
      </div>
    </section>
  );
}
