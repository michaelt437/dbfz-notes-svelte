import * as comboJson from "./combos.json";
import { writable, derived, readable, Readable } from "svelte/store";
import type { Combo } from "./types";

export const roster = Object.keys(comboJson.characters).sort();

export const character = writable(roster[0]);

export const currentChar: Readable<Combo[]> = derived(
  character,
  $character => comboJson.characters[$character.toLowerCase()]
)
