<script lang="ts">
import type { Combo } from "../types";
export let combo: Combo;
let open = false;
</script>

<div class="box" on:click={() => open = !open }>
  <div class="box-header level mb-5">
    <h5 class="title is-5 level-left mb-0"># {combo.title} - {combo.position}</h5>
    {#if combo.damage}
      <p class="level-right mb-0 is-hidden-mobile">
        Damage: <span class="has-text-primary ml-1">{combo.damage}</span>
      </p>
    {/if}
  </div>
  <div class="box-content">
    <div class="mb-4 p-5 has-background-white-ter inputs" on:click|stopPropagation={null}>
      {combo.inputs}
    </div>
    {#if open}
      <div class="details">
        {#if combo.tips}
          <div class="mb-4 p-5 has-background-info-light tips" on:click|stopPropagation={null}>
            Tips:
            <ul>
            {#each combo.tips as tip}
              <li>{@html tip}</li>
            {/each}
            </ul>
          </div>
        {/if}
        <iframe title="" class="mb-2" width="100%" src="https://www.youtube.com/embed/{combo.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    {/if}
    {#if combo.video}
      <div class="box-footer">
        <p class="toggleVideo has-text-centered">
          <span class="icon has-text-grey-light">
            <i class={open ? 'fas fa-chevron-up' : 'fas fa-chevron-down'}></i>
          </span>
        </p>
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  .box {
    cursor: pointer;

    .inputs {
      font-family: 'Consolas', Courier, monospace;
      cursor: text;
    }

    .tips {
      cursor: text;
    }

    iframe {
      @media(max-width: 768px) {
        height: 250px;
      }
      @media(min-width: 767px) {
        height: 400px;
      }
    }
  }

</style>