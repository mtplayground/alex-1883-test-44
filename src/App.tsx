import { AbacusBoard } from './components';

function App() {
  return (
    <main className="min-h-screen bg-stone-100 px-3 py-6 text-slate-900 sm:px-6 sm:py-8 lg:px-8">
      <section
        className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl flex-col justify-center gap-6 sm:min-h-[calc(100vh-4rem)] sm:gap-8"
        aria-labelledby="app-title"
      >
        <header className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-normal text-teal-700">
            Interactive decimal abacus
          </p>
          <h1
            id="app-title"
            className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-5xl"
          >
            Abacus workspace
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700 sm:mt-5 sm:text-lg sm:leading-8">
            Slide beads across each decimal wire to build whole numbers on a
            simple ten-bead abacus.
          </p>
        </header>

        <AbacusBoard />
      </section>
    </main>
  );
}

export default App;
