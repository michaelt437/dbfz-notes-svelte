// import * as comboJson from "./combos.json";
import { Writable, writable, derived, readable, Readable } from "svelte/store";
import type { Combo, Character } from "./types";

let character = writable<Character>({ name: "", id: "" });
let openEditModal = writable<boolean>(false);
let roster = writable<Character[]>([]);

export { 
  character,
  openEditModal,
  roster
};
