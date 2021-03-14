<script lang="ts">
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  function triggerMenu () {
    dispatch("triggerMenu")
  }

  export let openSidebar: boolean;
</script>

<nav class="navbar is-transparent mb-5">
  <span class="icon is-size-4 mx-5 is-hidden-desktop" on:click={triggerMenu}>
    <i class="{openSidebar ? 'fas fa-times' : 'fas fa-bars'}"></i>
  </span>
  <h1 class="is-size-2">DBFZ</h1>
</nav>

<style>
  .navbar {
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #d9d9d9;
  }
  
  .navbar .icon {
    cursor: pointer;
  }
  
  @media(max-width: 768px) {
    .navbar {
      display: flex;
      justify-content: start;
      align-items: center;
    }
  }
</style>