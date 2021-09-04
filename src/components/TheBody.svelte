<script lang="ts">
import { onMount } from "svelte";

  import db from "../firebase";
  import { character } from "../store";
  import type { Combo } from "../types";
  import Card from "./TheCard.svelte";
  import Empty from "./TheEmptyState.svelte";

  let comboRoutes: Combo[] = [];
  let search: string = "";

  async function fetchRoutes (): Promise<void> {
    comboRoutes = [];
    return await db.collection("routes")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(route => {
        comboRoutes = [...comboRoutes, route.data() as Combo];
      })
    })
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
  <h1 class="is-size-4 is-capitalized mb-2">Routes</h1>
  <div class="is-flex is-justify-content-space-between is-align-items-center">
    <input class="input is-normal  my-3" type="text" placeholder="Search..." bind:value={search}/>
  </div>
  {#if filteredRoutes.length}
    {#each filteredRoutes as combo}
      <Card combo={combo} on:openEditModal />
    {/each}
  {:else}
    <Empty />
  {/if}
</div>