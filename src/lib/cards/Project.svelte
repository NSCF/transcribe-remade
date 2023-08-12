<script>
  import toISODate from '../../app/utils/timestampToISODate';

  /** @type {import('../../types/Project.js').Project}*/
  export let project

  let batchesCapturedProgress = Math.round(project.batchesCaptured/project.batchCount * 100)
  let batchesQCdProgress = Math.round(project.batchesChecked/project.batchCount * 100)

</script>

<a data-sveltekit-preload-data="tap" href="/projects/{project.projectID}" class="relative w-60 h-[200px] p-2 border rounded shadow bg-gray-50 hover:ring-2">
  <h4 class="text-2xl font-thin mb-2">{project.projectName}</h4>
  <p class="text-sm font-thin">Images: {project.specimenCount}</p>
  
  <p class="text-sm font-thin">Batch size: {project.batchSize}</p>
  <p class="text-sm font-thin">Batches: {project.batchCount}</p>
  <p class="absolute text-sm font-thin bottom-2 left-2">Created: {toISODate(project.createdDate)}</p>

  <div class="relative w-full h-4">
    <div class="h-full border rounded bg-green-300 text-sm" style="width:{batchesCapturedProgress}%">
    </div>
    <div class="h-full border rounded bg-orange-300" style="width:{batchesQCdProgress}%"></div>
  </div>

</a>
