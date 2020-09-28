<script>
  import { fade } from "svelte/transition";
  import { randomInt } from "d3-random";
  import { onMount } from "svelte";
  import convert from "color-convert";
  import colors from "../colors.json";
  let mounted = false;
  onMount(() => (mounted = true));
  let myColors = colors;
  function sortByHue() {
    myColors = myColors.sort(function (x, y) {
      x = convert.hex.hsl(x.text);
      y = convert.hex.hsl(y.text);
      if (x[0] < y[0]) {
        return -1;
      }
      if (x[0] > y[0]) {
        return 1;
      }
      return 0;
    });
  }
  function sortByLightness() {
    myColors = myColors.sort(function (x, y) {
      x = convert.hex.hsl(x.text);
      y = convert.hex.hsl(y.text);
      if (x[2] < y[2]) {
        return -1;
      }
      if (x[2] > y[2]) {
        return 1;
      }
      return 0;
    });
  }
  function sortBySaturation() {
    myColors = myColors.sort(function (x, y) {
      x = convert.hex.hsl(x.text);
      y = convert.hex.hsl(y.text);
      if (x[1] < y[1]) {
        return -1;
      }
      if (x[1] > y[1]) {
        return 1;
      }
      return 0;
    });
  }
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
  button {
    padding: 0.5rem;
    margin: 1em;
  }
  .buttonContainer {
    display: flex;
    justify-content: center;
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
  From Tweets I've liked from
  <a href="https://twitter.com/everycolorbot">@everycolorbot</a>
</h2>
<h3>Designed by <a href="https://danielchapman.dev">Daniel Chapman</a></h3>
<p>
  Using the Twitter API, I imported the last 200 tweets I liked, and used the
  ones from @everycolorbot to generate this grid of colors in SvelteJS.
</p>
<div class="buttonContainer">
  <button
    on:click={() => {
      sortByHue();
    }}>Sort By Hue</button>
  <button
    on:click={() => {
      sortByLightness();
    }}
    bind>Sort by Lightness</button>
  <button
    on:click={() => {
      sortBySaturation();
    }}>Sort by Saturation</button>
</div>
<div class="container">
  {#if mounted}
    {#each myColors as color}
      <a href={color.url}>
        <div
          class="color"
          style="background-color: #{color.text}"
          transition:fade={{ delay: randomInt(250, 1500)() }}>
          #{color.text}
        </div>
      </a>
    {/each}
  {/if}
</div>

<h3>
  See "<a
    href="https://www.dschapman.com/articles/how-i-used-twitter-as-a-cms">How I
    used Twitter as a CMS</a>" for more on how this site was built.
</h3>
