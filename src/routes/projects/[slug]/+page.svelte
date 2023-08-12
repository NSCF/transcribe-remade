<script>
  import ProjectBatch from '$lib/cards/ProjectBatch.svelte';
  import toISODate from '../../../app/utils/timestampToISODate';
  
  /** @type {import('./$types').PageData} */
  export let data;

  /**
 * @type {{project: import('../../../types/Project').Project, projectBatches: import('../../../types/ProjectBatch').ProjectBatch[]}}
 */
  const {project, projectBatches} = data
</script>

<div class="p-2 w-full h-full flex flex-col">
  <div class="flex-0 w-full flex justify-between">
    <h1 class="text-2xl font-light"><a href="/projects">Projects</a> &gt;&gt; {project.projectName}</h1>
    <p class="font-light">Created: {toISODate(project.createdDate)}</p>
  </div>
  <div class="flex-1 min-h-0 w-full flex gap-2 flex-wrap overflow-y-scroll">
    {#each projectBatches as batch}
    <ProjectBatch {batch} />
    {/each}
  </div>
</div>