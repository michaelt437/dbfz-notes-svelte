<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { character, roster } from "../store";
  let dipatch = createEventDispatcher();

  export let openSidebar: boolean;
  function setCharacter (newCharacter: string) {
    $character = newCharacter;
    if (openSidebar) {
      dipatch("triggerMenu");
    }
  }
</script>
<div class="column { openSidebar ? 'open' : ''}">
  <aside class="menu">
    <p class="menu-label">Characters</p>
    <ul class="menu-list is-capitalized">
    {#each roster as item}
      <li class="{item.toLowerCase() === $character.toLowerCase() ? 'active has-text-primary' : ''}" on:click={() => setCharacter(item)}>{item}</li>
    {/each}
    </ul>
  </aside>
</div>

<style lang="scss">
  .menu {
    position: sticky;
    top: 25px;
  }
  .menu-list {
    li {
      cursor: pointer;
      padding: 4px 12px 4px 16px;
      margin: 4px 0;

      &.active {
        font-weight: medium;
        box-shadow: inset 2px 0 0 0 hsl(171, 100%, 41%);
      }

      &:hover {
        color: #00d1b2;
      }
    }
  }

  @media(max-width: 768px) {
    .column {
      position: absolute;
      transform: translate(-110%, -2.5%);
      height: 100vh;
      transition: transform .3s ease-in;
      background-color: white;
      width: 200px;

      &.open {
        transform: translate(-6%, -2.5%);
      }
    }
  }
</style>