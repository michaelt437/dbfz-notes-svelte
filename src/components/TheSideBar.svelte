<script lang="ts">
  import { character } from "../store";
  let items: string[] = [
    "Bardock",
    "Broly (DBS)",
    "Ginyu",
    "Janemba",
    "TODs"
  ];
  function setCharacter (newCharacter: string) {
    $character = newCharacter;
  }
  console.log($character)
</script>

<div class="column">
  <aside class="menu">
    <p class="menu-label">Characters</p>
    <ul class="menu-list">
    {#each items as item}
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
        background-color: #f0f4f2;
      }
    }
  }
</style>