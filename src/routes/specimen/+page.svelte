<script>
  import ImageViewer from "$lib/components/ImageViewer.svelte";
  import DataForm from "$lib//components/DataForm.svelte";

  let images = ['PRU0006054.dzi',
    'PRU0038707.dzi',
    'PRU0046633.dzi',
    'PRU0046640.dzi',
    'PRU0046648.dzi',
    'PRU0047133.dzi',
    'PRU0049434.dzi',
    'PRU0050045.dzi',
    'PRU0050378.dzi',
    'PRU0050379.dzi',
    'PRU0050412.dzi',
    'PRU0059986.dzi',
    'PRU0074608.dzi',
    'PRU0094421.dzi',
    'PRU0094421.dzi']
    
  let currentIndex = 0

  const previousImage = _ => {
    if(currentIndex > 0) {
      currentIndex--
    }
  }

  const nextImage = _ => {
    if (currentIndex <= images.length - 1) {
      currentIndex++
    }
  }

  

</script>

<div class="grid w-full h-full grid-cols-3 gap-1">
  <div class="col-span-2 w-full h-full border rounded">
    <ImageViewer {images} />
  </div>
  <div class="h-full min-h-0  p-2 border rounded">
    <DataForm on:record-saved={console.log}/>
  </div>
</div>