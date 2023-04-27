<script>
  import ImageViewer from "$lib/components/ImageViewer.svelte";
  import DataForm from "$lib//components/DataForm.svelte";
</script>

<div class="grid w-full h-full grid-cols-3 gap-1">
  <div class="col-span-2 w-full h-full border rounded">
    <ImageViewer />
  </div>
  <div class="h-full min-h-0  p-2 border rounded">
    <DataForm on:record-saved={console.log}/>
  </div>
</div>