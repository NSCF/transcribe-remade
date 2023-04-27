<script>

  /**
   * @type {import("../../types/Project").Project} Project
  */
  export let project = {
    projectID: null, projectName: null, dateCreated: null, createdBy: null,
    totalImages: 0, totalBatches: 0, batchesComplete: 0, totalPercentageComplete: 0.0
  }

  /**
   * @param {Event} _
   */
  const addRecord = _ => {
    project.createdBy = 'asdf'
  }


</script>

<div class="">
  <form class="mx-auto my auto w-1/3">
    <h3 class="text-xl text-slate-600">
      Add a new project
    </h3>
    <div class="relative w-full">
      <input type="text" id="projectname" class="w-full peer placeholder-transparent" placeholder="projectname" />
      <label for="projectname" style="line-height: .8;" class="floating-label">project name</label>
    </div>
    <button class="btn submit ml-auto" on:click={addRecord}>Save record</button>

  </form>
</div>