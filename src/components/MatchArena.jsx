import { useMemo, useState } from 'react';
import { RotateCcw, Flag, Home } from 'lucide-react';

function useScoreboard(teams) {
  const [score, setScore] = useState({ [teams.team1]: 0, [teams.team2]: 0 });
  const addWin = (teamName) => setScore((s) => ({ ...s, [teamName]: (s[teamName] || 0) + 1 }));
  const reset = () => setScore({ [teams.team1]: 0, [teams.team2]: 0 });
  return { score, addWin, reset };
}

function TurnControl({ current, onPass }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-neutral-300">Turn: <b>{current}</b></span>
      <button onClick={onPass} className="px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700">Pass Turn</button>
    </div>
  );
}

// ------------- Games

function TicTacToe({ onWinner, teamA, teamB }) {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);
  const winner = useMemo(() => {
    const lines = [
      [0,1,2],[3,4,5],[6,7,8],
      [0,3,6],[1,4,7],[2,5,8],
      [0,4,8],[2,4,6]
    ];
    for (const [a,b,c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
    }
    return null;
  }, [board]);

  const play = (i) => {
    if (board[i] || winner) return;
    const next = [...board];
    next[i] = isX ? 'X' : 'O';
    setBoard(next);
    setIsX(!isX);
  };

  const reset = () => { setBoard(Array(9).fill(null)); setIsX(true); };

  const label = isX ? teamA : teamB;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2 w-60">
        {board.map((v, i) => (
          <button key={i} onClick={() => play(i)} className="h-20 rounded-md bg-neutral-900 border border-neutral-700 text-2xl font-bold">
            {v}
          </button>
        ))}
      </div>
      {winner && (
        <div className="flex items-center gap-3">
          <span className="text-green-400 font-medium">Winner: {winner === 'X' ? teamA : teamB}</span>
          <button onClick={() => onWinner(winner === 'X' ? teamA : teamB)} className="px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500">Confirm Result</button>
          <button onClick={reset} className="px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700 inline-flex items-center gap-2"><RotateCcw className="size-4"/>Reset</button>
        </div>
      )}
      {!winner && (
        <div className="text-sm text-neutral-300">Next move: <b>{label}</b></div>
      )}
    </div>
  );
}

function ChessPlaceholder({ onWinner, teamA, teamB }) {
  return (
    <div className="space-y-4">
      <p className="text-neutral-300 max-w-prose">A full chess engine is out of scope for this iteration. Use any physical/third-party reference for gameplay while tracking turns manually here. When the match ends, record the winner below.</p>
      <div className="flex gap-3">
        <button onClick={() => onWinner(teamA)} className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500">{teamA} Won</button>
        <button onClick={() => onWinner(teamB)} className="px-4 py-2 rounded-md bg-fuchsia-600 hover:bg-fuchsia-500">{teamB} Won</button>
        <button onClick={() => onWinner('draw')} className="px-4 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 inline-flex items-center gap-2"><Flag className="size-4"/>Draw</button>
      </div>
    </div>
  );
}

function Quiz({ onWinner, teamA, teamB }) {
  const [question, setQuestion] = useState(null);
  const [answer, setAnswer] = useState('');
  const [turn, setTurn] = useState(teamA);

  const fetchQuestion = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/quiz`);
      if (!res.ok) throw new Error('Network error');
      const data = await res.json();
      setQuestion(data);
      setAnswer('');
    } catch (e) {
      console.error(e);
      setQuestion({ prompt: 'Error fetching quiz. Check connection.', solution: '' });
    }
  };

  const submit = () => {
    if (!question) return;
    const correct = answer.trim().toLowerCase();
    const target = String(question.solution || '').trim().toLowerCase();
    const winnerTeam = correct && target && correct === target ? turn : (turn === teamA ? teamB : teamA);
    onWinner(winnerTeam);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button onClick={fetchQuestion} className="px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700">New Question</button>
        <span className="text-sm text-neutral-300">Answering: <b>{turn}</b></span>
      </div>
      <div className="p-4 rounded-md bg-neutral-900 border border-neutral-700 min-h-[100px]">
        <div className="font-medium">{question ? question.prompt : 'Press New Question to begin.'}</div>
      </div>
      <div className="flex gap-2">
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer"
          className="flex-1 rounded-md bg-neutral-900 border border-neutral-700 px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-600"
        />
        <button onClick={submit} className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500">Submit</button>
      </div>
      <button onClick={() => setTurn(turn === teamA ? teamB : teamA)} className="px-3 py-1.5 rounded-md bg-neutral-800 hover:bg-neutral-700">Pass Turn</button>
    </div>
  );
}

export default function MatchArena({ teams, picks, onExit }) {
  const games = [picks.team1, picks.team2];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [turn, setTurn] = useState(teams.team1);
  const { score, addWin, reset } = useScoreboard({ team1: teams.team1, team2: teams.team2 });

  const teamA = teams.team1;
  const teamB = teams.team2;

  const nextGame = () => setCurrentIndex((i) => i + 1);
  const passTurn = () => setTurn((t) => (t === teamA ? teamB : teamA));

  const currentGame = games[currentIndex];
  const allDone = currentIndex > 1; // two games

  const handleWinner = (winner) => {
    if (winner !== 'draw') addWin(winner);
    nextGame();
  };

  const declare = () => {
    if (score[teamA] === score[teamB]) return 'Draw';
    return score[teamA] > score[teamB] ? `${teamA} Wins` : `${teamB} Wins`;
  };

  return (
    <section className="max-w-6xl mx-auto px-6 py-8">
      <div className="flex items-center justify-between mb-6">
        <button onClick={onExit} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700"><Home className="size-4"/>Home</button>
        <div className="flex items-center gap-4">
          <div className="px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700">{teamA}: <b>{score[teamA]}</b></div>
          <div className="px-3 py-1.5 rounded-md bg-neutral-900 border border-neutral-700">{teamB}: <b>{score[teamB]}</b></div>
          <TurnControl current={turn} onPass={passTurn} />
          <button onClick={reset} className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700"><RotateCcw className="size-4"/>Reset Score</button>
        </div>
      </div>

      {!allDone && (
        <div className="space-y-4">
          <div className="text-sm text-neutral-400">Game {currentIndex + 1} of 2 • Mode: <b className="text-white uppercase">{currentGame}</b></div>
          {currentGame === 'tictactoe' && (
            <TicTacToe onWinner={handleWinner} teamA={teamA} teamB={teamB} />
          )}
          {currentGame === 'quiz' && (
            <Quiz onWinner={handleWinner} teamA={teamA} teamB={teamB} />
          )}
          {currentGame === 'chess' && (
            <ChessPlaceholder onWinner={handleWinner} teamA={teamA} teamB={teamB} />
          )}
        </div>
      )}

      {allDone && (
        <div className="mt-10 p-6 rounded-lg bg-neutral-900 border border-neutral-700 text-center">
          <h3 className="text-2xl font-semibold mb-2">Final Result</h3>
          <p className="text-lg mb-6">{declare()}</p>
          <div className="flex items-center justify-center gap-3">
            <button onClick={onExit} className="px-4 py-2 rounded-md bg-indigo-600 hover:bg-indigo-500">Back to Home</button>
          </div>
        </div>
      )}
    </section>
  );
}
