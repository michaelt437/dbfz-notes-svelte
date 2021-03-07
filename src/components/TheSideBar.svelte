<script lang="ts">
  let items: string[] = [
    "Broly (DBS)",
    "Ginyu",
    "Janemba",
    "TODs"
  ];
</script>

<ul>
  {#each items as item}
  <li>{item}</li>
  {/each}
</ul>