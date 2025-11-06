import Spline from '@splinetool/react-spline';

export default function Hero({ onStart }) {
  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/UGnf9D1Hp3OG8vSG/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 w-full">
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Two Teams. Two Games. One Champion.
            </h1>
            <p className="mt-4 text-neutral-300 max-w-prose">
              Play locally with a friend. Pick two from Chess, Tic-Tac-Toe, and Quiz. Alternate turns manually, keep it fair, and let the best team win.
            </p>
            <div className="mt-6">
              <button
                onClick={onStart}
                className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 font-medium"
              >
                Start
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent" />
    </section>
  );
}
