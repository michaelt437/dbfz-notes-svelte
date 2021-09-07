<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { user } from "../store";
  import { fb, auth } from "../firebase";

  const dispatch = createEventDispatcher();

  function triggerMenu () {
    dispatch("triggerMenu")
  }

  function login () {
    const provider = new auth.GoogleAuthProvider();
    fb.auth().signInWithRedirect(provider);
  }

  function logout () {
    fb.auth().signOut();
    window.location.reload();
  }

  onMount(() => {
    fb.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        user.update(() => {
          return {...authUser};
        })
      }
    })
  })

  export let openSidebar: boolean;
</script>

<nav class="navbar is-transparent mb-5">
  <span class="icon is-size-4 mx-5 is-hidden-desktop" on:click={triggerMenu}>
    <i class="{openSidebar ? 'fas fa-times' : 'fas fa-bars'}"></i>
  </span>
  <h1 class="is-size-2">DBFZ</h1>
  {#if $user}
    <button class="button is-link is-light" on:click={logout}>Log Out</button>
  {/if}
  {#if !$user}
    <button class="button is-link is-light" on:click={login}>Login</button>
  {/if}
</nav>

<style>
  .navbar {
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid #d9d9d9;
    position: relative;
  }
  
  .navbar .icon {
    cursor: pointer;
  }

  .navbar button {
    position: absolute;
    right: 20px
  }
  
  @media(max-width: 768px) {
    .navbar {
      display: flex;
      justify-content: start;
      align-items: center;
    }
  }
</style>