<script>
  import { onMount } from 'svelte'
  import db from '../../db'
  import Project from '$lib/cards/Project.svelte'
  import NewProject from '$lib/cards/NewProject.svelte';

  let projects = []

  onMount(async _ => {
    const fetched = await db.projects.search()
    fetched.sort((a, b) => b.createdDate - a.createdDate)
    projects = fetched
    console.log(projects)
  })

</script>

<div class="p-8 flex gap-4 flex-wrap">
  {#each projects as project}
    <Project {project} />
  {/each}
  <NewProject />
</div>