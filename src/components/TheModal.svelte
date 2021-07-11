<script lang="typescript">
  import { createEventDispatcher } from "svelte";
  export let openModal;
  const dispatch = createEventDispatcher();

  function closeModal (): void {
    dispatch("closeModal");
  }

  function saveChanges (): void {
    closeModal();
  }
</script>
<div class="modal" class:show="{openModal == true}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Modal title</p>
      <button class="delete" aria-label="close" on:click={closeModal}></button>
    </header>
    <section class="modal-card-body">
      <!-- Content ... -->
    </section>
    <footer class="modal-card-foot is-justify-content-flex-end">
      <button class="button" on:click={closeModal}>Cancel</button>
      <button class="button is-success" on:click={saveChanges}>Save changes</button>
    </footer>
  </div>
</div>
<style>
  .modal-card {
    top: 100px;
  }
  .show {
    display: block;
  }
</style>