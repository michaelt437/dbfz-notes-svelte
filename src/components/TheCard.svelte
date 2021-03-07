<script lang="ts">
import type { Combo } from "../types";
export let combo: Combo;
</script>

<div class="box">
  <div class="box-header level mb-5">
    <h5 class="title is-5 level-left mb-0"># {combo.title} - {combo.position}</h5>
    {#if combo.damage}
      <p class="level-right mb-0">
        Damage: <span class="has-text-primary ml-1">{combo.damage}</span>
      </p>
    {/if}
  </div>
  <div class="box-content">
    <div class="mb-4 p-5 has-background-white-ter">
      {combo.inputs}
    </div>
    {#if combo.tips.length}
      <div class="details is-hidden">
        <div class="mb-4 p-5 has-background-info-light">
          Tips:
          <ul>
          {#each combo.tips as tip}
            <li>{tip}</li>
          {/each}
          </ul>
          <iframe title="" class="mb-2" width="100%" height="500" src="https://www.youtube.com/embed/{combo.video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>
    {/if}
    {#if combo.video}
      <div class="box-footer">
        <p class="toggleVideo has-text-centered">
          <span class="icon has-grey-light">
            <i class="fas fa-chevron-down"></i>
          </span>
        </p>
      </div>
    {/if}
  </div>
</div>