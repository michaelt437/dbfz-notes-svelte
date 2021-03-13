<script lang="ts">
  import { character, currentChar } from "../store";
  import Card from "./TheCard.svelte";
  import Empty from "./TheEmptyState.svelte";
</script>

<div class="column is-four-fifths">
  <h1 class="is-size-3 is-uppercase mb-4">{$character}</h1>
  {#if $currentChar.length}
    {#each $currentChar as combo}
      <Card combo={combo} />
    {/each}
  {:else}
<Empty />
{/if}
</div>