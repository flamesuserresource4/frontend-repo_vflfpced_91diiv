import { Home } from 'lucide-react';

export default function Header({ onHome }) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60 border-b border-neutral-800">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-9 rounded-lg bg-gradient-to-br from-indigo-600 to-fuchsia-600 flex items-center justify-center font-bold">G</div>
          <span className="font-semibold tracking-tight">Duel Arena</span>
        </div>
        <button
          onClick={onHome}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 transition-colors"
          aria-label="Home"
        >
          <Home className="size-4" />
          Home
        </button>
      </div>
    </header>
  );
}
