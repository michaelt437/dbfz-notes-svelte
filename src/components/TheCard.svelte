<script lang="ts">
  import { createEventDispatcher } from  "svelte";
  import { selectedCombo } from "../store";
  import type { Combo } from "../types";
  export let combo: Combo;
  let actionsMenu = false;
  let tipsOpen = false;
  const dispatch = createEventDispatcher();
  
  function editComboRoute (): void {
    selectedCombo.update(() => {
      return {...combo};
    });
  }

  function invokeModal () {
    editComboRoute();
    dispatch("openEditModal");
  }

</script>

<svelte:body on:click={() => actionsMenu = false} />
<div class="box">
  <div class="box-header level mb-5">
    <h5 class="title is-5 level-left mb-0"># {combo.title}</h5>
    <p class="level-right mb-0 is-hidden-mobile">
    {#if combo.tags}
      <div class="tags">
        {#each combo.tags as tag}
          <span class="tag is-info is-light">{tag.toLowerCase()}</span>
        {/each}
      </div>
    {/if}
    </p>
  </div>
  <div class="box-content">
    {#if combo.video}
      <iframe title="" class="mb-2" width="100%" src="https://www.youtube.com/embed/{combo.video}" loading="lazy" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    {/if}
    <div class="mb-4 p-5 has-background-white-ter inputs" on:click|stopPropagation={null}>
      {combo.inputs}
    </div>
    {#if tipsOpen}
      <div class="mb-4 p-5 has-background-info-light tips" on:click|stopPropagation={null}>
        Tips
        <ul>
        {#each combo.tips as tip}
          <li style="list-style-type: '⭐'; list-style-position: inside;">{@html tip}</li>
        {/each}
        </ul>
      </div>
    {/if}
  </div>
  <div class="box-footer">
    {#if combo.tips.length}
      <button class="button is-primary is-light" on:click={() => tipsOpen = !tipsOpen}>{tipsOpen ? "Hide Tips" : "Show Tips"}</button>
    {/if}
    <button class="button is-light has-text-grey-light" on:click|stopPropagation={invokeModal}><i class="fas fa-edit"></i></button>
  </div>
</div>

<style>
  .box {
    padding: 0;
  }

  .box-header, .box-content {
    padding: 0 1.25rem;
  }

  .box-header {
    padding-top: 1.25rem;
  }

  .box .inputs {
    font-family: 'Consolas', Courier, monospace;
    cursor: text;
  }

  .box .box-footer {
    display: flex;
    justify-content: flex-end;
    position: relative;
    z-index: 1;
  }

  .box-footer .button {
    flex-basis: 25%;
  }

  .box-footer .button {
    border-radius: 0;
  }

  .box-footer button:last-child {
    border-bottom-right-radius: 6px;
    flex-basis: 7%
  }

  @media(max-width: 768px) {
    .box iframe {
      height: 250px;
    }
  }

  @media(min-width: 767px) {
    .box iframe {
      height: 400px;
    }
  }

</style>