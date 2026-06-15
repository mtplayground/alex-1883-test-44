function App() {
  return (
    <main className="min-h-screen bg-stone-100 px-4 py-10 text-slate-900 sm:px-6 lg:px-8">
      <section
        className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl items-center"
        aria-labelledby="app-title"
      >
        <div className="w-full max-w-3xl rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-normal text-teal-700">
            Interactive decimal abacus
          </p>
          <h1
            id="app-title"
            className="mt-3 text-4xl font-bold tracking-normal text-slate-950 sm:text-5xl"
          >
            Abacus workspace
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700">
            The React app shell is ready for the abacus model, board, controls,
            and tests planned in the remaining issues.
          </p>
        </div>
      </section>
    </main>
  );
}

export default App;
