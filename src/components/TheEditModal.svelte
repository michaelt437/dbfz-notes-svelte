<script lang="typescript">
  import { createEventDispatcher, onMount } from "svelte";
import db from "../firebase";
  import { selectedCombo } from "../store";
  export let openEditModal;
  const dispatch = createEventDispatcher();

  let editingRoute = JSON.parse(JSON.stringify($selectedCombo));

  let rawTags = editingRoute.tags.join(", ");
  $: editingTags = rawTags.split(",").map(tag => tag.trim().toLowerCase());

  function closeModal (): void {
    dispatch("closeModal");
  }

  function addTip (): void {
    editingRoute.tips = [...editingRoute.tips, ""];
  }

  function deleteTip (index: number): void {
    editingRoute.tips.splice(index, 1);
    editingRoute.tips = editingRoute.tips;
  }

  async function saveChanges (): Promise<void> {
    const submit = await db.collection("routes")
      .doc(editingRoute.id)
      .set({
        ...editingRoute,
        tags: editingTags
      });
    closeModal();
  }
</script>
<div class="modal" class:show="{openEditModal == true}">
  <div class="modal-background"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Edit - {editingRoute.title}</p>
      <button class="delete" aria-label="close" on:click={closeModal}></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <label for="route-title" class="label">Title</label>
        <div class="control">
          <input id="route-title" type="text" class="input" placeholder="Title" bind:value={editingRoute.title} />
        </div>
      </div>
      <div class="field">
        <label for="route-inputs" class="label">Inputs</label>
        <div class="control">
          <textarea class="textarea" placeholder="5LLL" bind:value={editingRoute.inputs}></textarea>
        </div>
      </div>
      <div class="field">
        <div class="is-flex is-align-items-center mb-2">
          <label for="route-tips" class="label mb-0 mr-2">Tips</label>
          <span class="icon" on:click={addTip}>
            <i class="fas fa-plus-circle"></i>
          </span>
        </div>
        {#each editingRoute.tips as tip, index}
          <div class="control mb-2">
            <div class="is-flex is-align-items-center">
              <input type="text" class="input" placeholder="Route tip" bind:value={editingRoute.tips[index]} />
              <span class="icon" on:click={() => deleteTip(index)}>
                <i class="fas fa-times"></i>
              </span>
            </div>
          </div>
        {/each}
      </div>
      <div class="field">
        <label for="route-tags" class="label">Tags</label>
        <div class="control">
          <input id="route-tags" type="text" class="input" placeholder="Comma separated tags" bind:value={rawTags} />
        </div>
      </div>
      <div class="field">
        <label for="route-video" class="label">Video</label>
        <div class="control">
          <input id="route-video" type="text" class="input" placeholder="Video" bind:value={editingRoute.video} />
        </div>
      </div>
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