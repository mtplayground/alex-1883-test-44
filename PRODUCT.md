# Product Contract

## What This Is

`alex-1883-test-44` is an interactive decimal abacus web app. It lets a user
slide beads on five decimal wires, see the represented integer update in real
time, and reset the board to zero.

## Current User-Facing Behavior

- Renders a responsive abacus board with five wires and ten beads per wire.
- Beads can be clicked, dragged across a wire, or adjusted with Enter/Space.
- Active beads move to the left side of a wire; inactive beads remain on the
  right side.
- The live numeric readout is computed from the current bead state.
- The Reset control returns every wire to zero and updates the readout.
- The layout scales down to narrow screens without horizontal overflow.

## Architecture Snapshot

- Frontend: Vite, React, TypeScript, and Tailwind CSS.
- Domain logic lives in `src/domain/abacus.ts` as pure functions and plain data
  structures.
- UI components live in `src/components/`:
  - `AbacusBoard` owns React board state.
  - `Wire` and `Bead` render the interactive board controls.
  - `ValueReadout` renders the computed value.
  - `ResetControl` triggers the reset operation.
- The app is static-only: no backend, database, or runtime environment variables
  are required.

## State And Value Model

- An `AbacusState` contains a fixed `beadCountPerWire` of `10` and an ordered
  list of `WireState` entries.
- Each wire has an `index`, `decimalPlace`, and `activeBeadCount`.
- `computeAbacusValue` sums each wire as `activeBeadCount * 10^decimalPlace`.
- Slide mechanics and reset behavior are pure functions, so UI state updates are
  deterministic and testable.

## Project Conventions

- Run the development server with `npm run dev`; it listens on
  `0.0.0.0:8080`.
- Build production output with `npm run build`; Vite writes static assets to
  `dist/`.
- Preview the production build with `npm run preview`; it also listens on
  `0.0.0.0:8080`.
- `dist/`, Playwright output, and dependency folders are generated artifacts and
  are ignored by git.

## Validation

- Unit tests: `npm run test`
- End-to-end browser test: `npm run test:e2e`
- Lint: `npm run lint`
- Format check: `npm run format:check`
- Production build: `npm run build`
