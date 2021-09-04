<script lang="ts">
  import db from "../firebase";
  import { character } from "../store";
  import type { Combo } from "../types";
  import Card from "./TheCard.svelte";
  import Empty from "./TheEmptyState.svelte";

  let comboRoutes: Combo[] = [];

  function fetchCombos (id): Promise<void> {
    comboRoutes = [];
    if (id) {
      return new Promise ((resolve, reject) => {
        db.collection(id)
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(comboData => {
            comboRoutes = [...comboRoutes, comboData.data() as Combo];
            resolve();
          })
        })
        .catch(error => {
          reject(error);
        })
      })
    }
  }

  $: fetchCombos($character.id) ;
</script>

<div class="column is-four-fifths">
  <h1 class="is-size-4 is-capitalized mb-5">{$character.name}</h1>
  {#if comboRoutes.length}
    {#each comboRoutes as combo}
      <Card combo={combo} on:openEditModal />
    {/each}
  {:else}
    <Empty />
  {/if}
</div>