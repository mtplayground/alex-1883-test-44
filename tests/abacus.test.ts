import { describe, expect, it } from 'vitest';
import {
  BEADS_PER_WIRE,
  computeAbacusValue,
  computeActiveBeadCountsValue,
  computeWireValue,
  createAbacusState,
  createWireState,
  getActiveBeadCountAfterClick,
  resetAbacusState,
  slideAbacusBead,
  slideWireBead,
} from '../src/domain/abacus';

describe('abacus value computation', () => {
  it('computes a wire value from active beads and decimal place', () => {
    expect(computeWireValue(createWireState(0, 7))).toBe(7);
    expect(computeWireValue(createWireState(3, 4))).toBe(4_000);
  });

  it('computes a whole abacus value from active bead counts', () => {
    const state = createAbacusState({
      wireCount: 4,
      activeBeadCounts: [3, 2, 1, 0],
    });

    expect(computeAbacusValue(state)).toBe(123);
    expect(computeActiveBeadCountsValue([8, 0, 5])).toBe(508);
  });

  it('allows all beads on a wire to contribute to the represented integer', () => {
    expect(computeWireValue(createWireState(0, BEADS_PER_WIRE))).toBe(10);
    expect(computeActiveBeadCountsValue([BEADS_PER_WIRE, 2])).toBe(30);
  });

  it('rejects invalid active bead counts', () => {
    expect(() => createWireState(0, BEADS_PER_WIRE + 1)).toThrow(RangeError);
    expect(() => computeActiveBeadCountsValue([-1])).toThrow(RangeError);
  });
});

describe('abacus slide mechanics', () => {
  it('slides inactive beads and intervening neighbors to the active side', () => {
    expect(getActiveBeadCountAfterClick(0, 4)).toBe(5);
    expect(getActiveBeadCountAfterClick(3, 6)).toBe(7);
  });

  it('slides an active bead and following active neighbors back to zero side', () => {
    expect(getActiveBeadCountAfterClick(5, 2)).toBe(2);
    expect(getActiveBeadCountAfterClick(BEADS_PER_WIRE, 9)).toBe(9);
  });

  it('updates only the selected wire and leaves the original state unchanged', () => {
    const state = createAbacusState({
      wireCount: 3,
      activeBeadCounts: [1, 2, 3],
    });

    const nextState = slideAbacusBead(state, 1, 5);

    expect(nextState).not.toBe(state);
    expect(nextState.wires.map((wire) => wire.activeBeadCount)).toEqual([
      1, 6, 3,
    ]);
    expect(state.wires.map((wire) => wire.activeBeadCount)).toEqual([1, 2, 3]);
  });

  it('slides a standalone wire without mutating it', () => {
    const wire = createWireState(2, 6);
    const nextWire = slideWireBead(wire, 3);

    expect(nextWire).toEqual({
      index: 2,
      decimalPlace: 2,
      activeBeadCount: 3,
    });
    expect(wire.activeBeadCount).toBe(6);
  });

  it('resets every wire to zero active beads', () => {
    const state = createAbacusState({
      wireCount: 3,
      activeBeadCounts: [4, 0, 9],
    });

    expect(resetAbacusState(state).wires).toEqual([
      { index: 0, decimalPlace: 0, activeBeadCount: 0 },
      { index: 1, decimalPlace: 1, activeBeadCount: 0 },
      { index: 2, decimalPlace: 2, activeBeadCount: 0 },
    ]);
  });

  it('rejects invalid bead or wire selections', () => {
    const state = createAbacusState({ wireCount: 2 });

    expect(() => getActiveBeadCountAfterClick(0, BEADS_PER_WIRE)).toThrow(
      RangeError,
    );
    expect(() => slideAbacusBead(state, 4, 1)).toThrow(RangeError);
  });
});
