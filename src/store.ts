// import * as comboJson from "./combos.json";
import { Writable, writable, derived, readable, Readable } from "svelte/store";
import type { Combo, Character } from "./types";

let roster = writable<Character[]>([]);

const character = writable<Character>({ name: "", id: "" });
export { roster, character };


