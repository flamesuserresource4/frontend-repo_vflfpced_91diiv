import { useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import MatchSetup from './components/MatchSetup.jsx';
import MatchArena from './components/MatchArena.jsx';

export default function App() {
  const [phase, setPhase] = useState('home'); // 'home' | 'setup' | 'match'
  const [teams, setTeams] = useState({ team1: 'Team A', team2: 'Team B' });
  const [selections, setSelections] = useState({ team1: null, team2: null });

  const startSetup = () => setPhase('setup');

  const startMatch = (teamNames, picks) => {
    setTeams(teamNames);
    setSelections(picks);
    setPhase('match');
  };

  const goHome = () => {
    setPhase('home');
    setSelections({ team1: null, team2: null });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <Header onHome={goHome} />
      {phase === 'home' && (
        <div>
          <Hero onStart={startSetup} />
          <div className="max-w-5xl mx-auto px-6 py-12 text-center">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Play locally. Two teams. Two games. One winner.</h2>
            <p className="text-neutral-300 mb-6">Choose any two from Chess, Tic-Tac-Toe, and Quiz. Alternate turns manually with a single tap. Points are tracked automatically and a winner is announced at the end.</p>
            <button
              onClick={startSetup}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors font-medium"
              aria-label="Start match setup"
            >
              Start Match
            </button>
          </div>
        </div>
      )}

      {phase === 'setup' && (
        <MatchSetup onStartMatch={startMatch} onCancel={goHome} />
      )}

      {phase === 'match' && (
        <MatchArena teams={teams} picks={selections} onExit={goHome} />
      )}
    </div>
  );
}
