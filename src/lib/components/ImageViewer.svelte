<script>
  import {onMount} from 'svelte'
  import OpenSeaDragon from 'openseadragon'

  export let image = 'PRU0006054.dzi'
  let viewer = null

  onMount(_ => {
    viewer = OpenSeaDragon({
      id: "imageviewer",
      tileSources: `/images/${image}`,
      constrainDuringPan: true,
      animationTime: 0,
      showNavigator: true,
      showNavigationControl: false,
      visibilityRatio: 0.9,
      zoomPerScroll: 2
    });
  })


$: if (viewer && image) viewer.tileSources = `/images/${image}`
  
</script>

<div id="imageviewer" style="width: 100%; height: 100%" />