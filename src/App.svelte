<script>
  import { fade } from "svelte/transition";
  import { randomInt } from "d3-random";
  import { onMount } from "svelte";
  import colors from "../colors.json";
  let mounted = false;
  onMount(() => (mounted = true));
</script>

<style>
  a {
    text-decoration-color: white;
  }
  h1,
  h2,
  h3,
  p {
    text-align: center;
  }

  h2 {
    font-weight: 400;
  }
  h3 {
    font-style: italic;
    font-weight: 300;
  }
  .color {
    flex: 1;
    min-width: 175px;
    color: white;

    text-align: center;
    padding: 75px 0;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
  }
</style>

<h1>My Favorite Colors</h1>
<h2>
  From Tweets I've liked from <a href="https://twitter.com/everycolorbot">@everycolorbot</a>
</h2>
<h3>Designed by <a href="https://danielchapman.dev">Daniel Chapman</a></h3>
<p>
  Using the Twitter API, I imported the last 200 tweets I liked, and used the
  ones from @everycolorbot to generate this grid of colors in SvelteJS.
</p>
{#if mounted}
  <div class="container">
    {#each colors as color}
      <a href={color.url}>
        <div
          class="color"
          style="background-color: {color.text}"
          transition:fade={{ delay: randomInt(250, 1500)() }}>
          {color.text}
        </div>
      </a>
    {/each}
  </div>
{/if}
