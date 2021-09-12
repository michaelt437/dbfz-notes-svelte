<script lang="typescript">
import { createEventDispatcher } from "svelte";
import { user } from "../store";
import { db } from "../firebase";
import type { Combo } from "../types";
export let openAddModal;

const dispatch = createEventDispatcher();
let newRoute: Combo = {
  date: "",
  inputs: "",
  tags: [],
  tips: [],
  title: "",
  tod: false,
  video: ""
};

let rawTags = "";
$: newTags = rawTags.split(",").map(e => e.trim().toLowerCase());

function closeModal (): void {
  dispatch("closeModal");
  resetValues();
}

async function saveChanges (): Promise<void> {
  const addRoute = await db.collection("routes")
    .add({
      date: new Date().valueOf(),
      inputs: newRoute.inputs,
      tags: newTags,
      tips: newRoute.tips.filter(tip => tip.trim() !== ""),
      title: newRoute.title,
      tod: false,
      video: newRoute.video
    });
  closeModal();
}

function resetValues (): void {
  newRoute.title = "";
  newRoute.inputs =  "";
  rawTags = "";
  newRoute.tips =  [];
  newRoute.title =  "";
  newRoute.tod =  false;
  newRoute.video =  "";
}

function addTip (): void {
  newRoute.tips = [...newRoute.tips, ""];
}

function deleteTip (index: number): void {
  newRoute.tips.splice(index, 1);
  newRoute.tips = newRoute.tips;
}

</script>
<div class="modal" class:show={openAddModal}>
  <div class="modal-background" style="overflow: hidden;"></div>
  <div class="modal-card">
    <header class="modal-card-head">
      <p class="modal-card-title">Add Route</p>
      <button class="delete" aria-label="close" on:click={closeModal}></button>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <label for="route-title" class="label">Title</label>
        <div class="control">
          <input id="route-title" type="text" class="input" placeholder="Title" bind:value={newRoute.title} />
        </div>
      </div>
      <div class="field">
        <label for="route-inputs" class="label">Inputs</label>
        <div class="control">
          <textarea class="textarea" placeholder="5LLL" bind:value={newRoute.inputs}></textarea>
        </div>
      </div>
      <div class="field">
        <div class="is-flex is-align-items-center mb-2">
          <label for="route-tips" class="label mb-0 mr-2">Tips</label>
          <span class="icon" on:click={addTip} title="Add tip">
            <i class="fas fa-plus-circle"></i>
          </span>
        </div>
        {#each newRoute.tips as _, index}
          <div class="control mb-2">
            <div class="is-flex is-align-items-center">
              <input type="text" class="input" placeholder="Route tip" bind:value={newRoute.tips[index]} />
              <span class="icon" on:click={() => deleteTip(index)} title="Remove tip">
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
      {#if $user.uid === "hPH5RJL1s1ZNv8rtH1gIchMcMhz1"}
        <div class="field">
          <label for="route-video" class="label">Video</label>
          <div class="control">
            <input id="route-video" type="text" class="input" placeholder="Video" bind:value={newRoute.video} />
          </div>
        </div>
      {/if}
    </section>
    <footer class="modal-card-foot is-justify-content-flex-end">
      <button class="button" on:click={closeModal}>Cancel</button>
      <button class="button is-success" on:click={saveChanges}>Save changes</button>
    </footer>
  </div>
</div>
<style>
  .modal {
    max-height: 70%;
    max-width: 70%;
  }
  .show {
    display: flex;
  }
</style>