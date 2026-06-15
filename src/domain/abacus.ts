export const BEADS_PER_WIRE = 10;
export const MIN_WIRE_COUNT = 1;
export const DEFAULT_WIRE_COUNT = 5;
export const MIN_ACTIVE_BEAD_COUNT = 0;
export const MAX_ACTIVE_BEAD_COUNT = BEADS_PER_WIRE - 1;

export type WireIndex = number;
export type DecimalPlace = number;
export type ActiveBeadCount = number;

export interface WireState {
  readonly index: WireIndex;
  readonly decimalPlace: DecimalPlace;
  readonly activeBeadCount: ActiveBeadCount;
}

export interface AbacusState {
  readonly beadCountPerWire: typeof BEADS_PER_WIRE;
  readonly wires: readonly WireState[];
}

export interface CreateAbacusStateOptions {
  readonly wireCount?: number;
  readonly activeBeadCounts?: readonly ActiveBeadCount[];
}

export function isValidWireCount(wireCount: number): boolean {
  return Number.isInteger(wireCount) && wireCount >= MIN_WIRE_COUNT;
}

export function isValidDecimalPlace(
  decimalPlace: number,
): decimalPlace is DecimalPlace {
  return Number.isInteger(decimalPlace) && decimalPlace >= 0;
}

export function isValidActiveBeadCount(
  activeBeadCount: number,
): activeBeadCount is ActiveBeadCount {
  return (
    Number.isInteger(activeBeadCount) &&
    activeBeadCount >= MIN_ACTIVE_BEAD_COUNT &&
    activeBeadCount <= MAX_ACTIVE_BEAD_COUNT
  );
}

export function createWireState(
  index: WireIndex,
  activeBeadCount: ActiveBeadCount = MIN_ACTIVE_BEAD_COUNT,
): WireState {
  if (!isValidDecimalPlace(index)) {
    throw new RangeError('Wire index must be a non-negative integer.');
  }

  if (!isValidActiveBeadCount(activeBeadCount)) {
    throw new RangeError(
      `Active bead count must be an integer from ${MIN_ACTIVE_BEAD_COUNT} to ${MAX_ACTIVE_BEAD_COUNT}.`,
    );
  }

  return {
    index,
    decimalPlace: index,
    activeBeadCount,
  };
}

export function createAbacusState(
  options: CreateAbacusStateOptions = {},
): AbacusState {
  const { wireCount = DEFAULT_WIRE_COUNT, activeBeadCounts = [] } = options;

  if (!isValidWireCount(wireCount)) {
    throw new RangeError(
      `Wire count must be an integer greater than or equal to ${MIN_WIRE_COUNT}.`,
    );
  }

  if (activeBeadCounts.length > wireCount) {
    throw new RangeError('Active bead counts cannot exceed the wire count.');
  }

  return {
    beadCountPerWire: BEADS_PER_WIRE,
    wires: Array.from({ length: wireCount }, (_, index) =>
      createWireState(index, activeBeadCounts[index] ?? MIN_ACTIVE_BEAD_COUNT),
    ),
  };
}

export function computeWireValue(wire: WireState): number {
  if (!isValidDecimalPlace(wire.decimalPlace)) {
    throw new RangeError('Wire decimal place must be a non-negative integer.');
  }

  if (!isValidActiveBeadCount(wire.activeBeadCount)) {
    throw new RangeError(
      `Active bead count must be an integer from ${MIN_ACTIVE_BEAD_COUNT} to ${MAX_ACTIVE_BEAD_COUNT}.`,
    );
  }

  const value = wire.activeBeadCount * 10 ** wire.decimalPlace;

  if (!Number.isSafeInteger(value)) {
    throw new RangeError('Wire value exceeds the safe integer range.');
  }

  return value;
}

export function computeAbacusValue(state: AbacusState): number {
  if (state.beadCountPerWire !== BEADS_PER_WIRE) {
    throw new RangeError(
      `Abacus state must use ${BEADS_PER_WIRE} beads per wire.`,
    );
  }

  const value = state.wires.reduce(
    (total, wire) => total + computeWireValue(wire),
    0,
  );

  if (!Number.isSafeInteger(value)) {
    throw new RangeError('Abacus value exceeds the safe integer range.');
  }

  return value;
}

export function computeActiveBeadCountsValue(
  activeBeadCounts: readonly ActiveBeadCount[],
): number {
  const value = activeBeadCounts.reduce(
    (total, activeBeadCount, decimalPlace) => {
      const wireValue = computeWireValue({
        index: decimalPlace,
        decimalPlace,
        activeBeadCount,
      });

      return total + wireValue;
    },
    0,
  );

  if (!Number.isSafeInteger(value)) {
    throw new RangeError('Abacus value exceeds the safe integer range.');
  }

  return value;
}
