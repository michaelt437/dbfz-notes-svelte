<script lang="ts">
import { onMount, createEventDispatcher } from "svelte";
import { db } from "../firebase";
import { routes, user } from "../store";
import type { Combo } from "../types";
import Card from "./TheCard.svelte";
import Empty from "./TheEmptyState.svelte";

const dispatch = createEventDispatcher();
let comboRoutes: Combo[] = [];
let search: string = "";


async function fetchRoutes (): Promise<any> {
  comboRoutes = [];
  return await db.collection("routes")
  .onSnapshot({includeMetadataChanges: true}, querySnapshot => {
    querySnapshot.docChanges().forEach(route => {
      if (route.type === "added") {
        const _route = route.doc.data();
        _route.id = route.doc.id;
        let _comboRoutes = [...comboRoutes, _route as Combo].sort((a, b) => {
          if (a.date > b.date) return -1;
          else if (a.date < b.date) return 1;
          else return 0;
        });
        comboRoutes = _comboRoutes;
      }
    })
  })
}

function invokeModal () {
  dispatch("openAddModal");
}

$: filteredRoutes = comboRoutes.filter(route => {
  return route.title.toLowerCase().includes(search.trim().toLowerCase()) ||
    route.tags.findIndex(tag => tag.toLowerCase().includes(search.trim().toLowerCase())) > -1
})

onMount(() => {
  fetchRoutes();
})
</script>

<div class="column is-four-fifths">
  <div class="is-flex is-justify-content-space-between is-align-items-center">
    <input class="input is-normal  my-3" type="text" placeholder="Search..." bind:value={search} />
    {#if $user}
      <button class="button is-info ml-2" on:click={invokeModal}>
        <i class="fas fa-plus-circle mr-2"></i> Add Route
      </button>
    {/if}
  </div>
  {#if filteredRoutes.length}
    {#each filteredRoutes as combo}
      <Card combo={combo} on:openEditModal />
    {/each}
  {:else}
    <Empty />
  {/if}
</div>