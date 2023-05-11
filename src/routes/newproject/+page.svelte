<script>

  import ProjectForm from "$lib/components/ProjectForm.svelte";
  import {createProject, uploadProjectImage} from '$lib/interactors/projectInteractors'

 /** @type {User} */
 export let user = null

  let uploading = false
  let duplicateFileNames = []

  const handleProjectData = async ev => {
    const projectData = ev.detail
    const projectFiles = projectData.files
    projectData.userID = user.userID
    
    let project
    try {
      project = await createProject(projectData)
    }
    catch(err) {
      //TODO show the user any errors...
    }

    for (const file of projectFiles) {
      try {
        await uploadProjectImage(project.projectID, file)
      }
      catch(err) {
        //TODO show the user any errors...
      }

      //TODO update the progess bar

    }
  }

</script>

<div class="w-1/2 mx-auto">
  <ProjectForm on:project-data={handleProjectData} />
  {#if duplicateFileNames.length > 0}
    <div class="relative mb-3 w-full flex flex-wrap gap-1">
      {#each duplicateFileNames as fileName}
        <span class="p-2 rounded bg-orange-300">{fileName}</span>
      {/each}
    </div>
  {/if}
  {#if uploading}
    <div>
      Image upload progress...
    </div>
    <div id="progress" class="relative w-full h-4 border rounded">
      <div class="absolute w-1/3 h-4 bg-teal-500"></div>
    </div>
  {/if}
</div>