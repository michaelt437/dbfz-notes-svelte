import { writable } from "svelte/store";
import type { Combo, Character } from "./types";

let character = writable<Character>({ name: "", id: "" });
let roster = writable<Character[]>([]);
let selectedCombo = writable<Combo | null>(null);
let user = writable<any>(null);

export { character, roster, selectedCombo, user };
