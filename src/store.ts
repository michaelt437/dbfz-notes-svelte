import { writable } from "svelte/store";
import type { Combo } from "./types";

let routes = writable<Combo[]>([]);
let selectedCombo = writable<Combo | null>(null);
let user = writable<any>(null);

export { routes, selectedCombo, user };
