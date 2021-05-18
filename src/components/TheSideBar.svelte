<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { roster, character } from "../store";
  let dipatch = createEventDispatcher();

  export let openSidebar: boolean;

  function setCharacter (newCharacter) {
    $character = newCharacter;
    if (openSidebar) {
      dipatch("triggerMenu");
    }
  }
</script>
<div class="column { openSidebar ? 'open' : ''}">
  <aside class="menu mb-6">
    <p class="menu-label">Characters</p>
    <ul class="menu-list is-capitalized">
    {#each $roster as item}
      <li class="{item.name.toLowerCase() === $character.name.toLowerCase() ? 'active has-text-primary' : ''}" on:click={() => setCharacter(item)}>{item.name}</li>
    {/each}
    </ul>
  </aside>
  <button class="button is-primary is-outlined">
    <i class="fas fa-plus-circle mr-3"></i> Add a Combo
  </button>
</div>

<style>
  .menu {
    position: sticky;
    top: 25px;
  }
  .menu-list li {
    cursor: pointer;
    padding: 4px 12px 4px 16px;
    margin: 4px 0;

  }
  .menu-list li.active {
    font-weight: medium;
    box-shadow: inset 2px 0 0 0 hsl(171, 100%, 41%);
  }

  .menu-list li:hover {
    color: #00d1b2;
  }

  @media(max-width: 768px) {
    .column {
      position: absolute;
      transform: translate(-110%, -2.5%);
      height: 100vh;
      transition: transform .3s ease-in;
      background-color: white;
      width: 200px;

    }
    .column.open {
      transform: translate(-6%, -2.5%);
    }
  }
</style>