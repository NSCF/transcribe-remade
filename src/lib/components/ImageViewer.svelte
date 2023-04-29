<script>
  import {onMount} from 'svelte'
  import OpenSeaDragon from 'openseadragon'

  export let images = []
  let viewer = null

  onMount(_ => {
    let imageList = images.map(image => `/images/${image}`)
    viewer = OpenSeaDragon({
      id: "imageviewer",
      tileSources: imageList,
      constrainDuringPan: true,
      animationTime: 0,
      showNavigator: true,
      showNavigationControl: false,
      visibilityRatio: 0.9,
      zoomPerScroll: 2
    });
  })
  
</script>

<div class="relative w-full, h-full">
  <div id="imageviewer" style="width: 100%; height: 100%" />
  {#if images.length > 1}
  <div class="absolute bottom-0 w-full p-2 flex justify-center items-center gap-2" hidden={images.length == 1}>
    <button class='btn' on:click={viewer.goToPreviousPage()}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
    <!-- <span class="p-2">{currentIndex + 1} of {images.length}</span> -->
    <button class='btn' on:click={viewer.goToNextPage()}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  </div>
  {/if}
</div>