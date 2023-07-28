<script>
  import toISODate from '$utils/timestampToISODate.js';
  /** @type {import('../../types/Project.js').Project}*/
  export let project

</script>

<a href="/projects/{project.projectID}" class="relative w-60 h-[200px] p-2 border rounded bg-gray-50 hover:ring-2">
  <h4 class="text-2xl font-thin mb-2">{project.projectName}</h4>
  <p class="text-sm font-thin">Images: {project.specimenCount}</p>
  
  <p class="text-sm font-thin">Batches: {project.batchCount}</p>
  <p class="text-sm font-thin mb-2">Batch size: {project.batchSize}</p>
  <p class="absolute text-sm font-thin bottom-2 left-2">Created: {toISODate(project.createdDate)}</p>

</a>
