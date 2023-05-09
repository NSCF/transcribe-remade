<script>
  import InviteParticipantInput from "./InviteParticipantInput.svelte";
  import ParticipantBadge from "./ParticipantBadge.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher()

  let formData = {
    projectName: null,
    notes: null,
    batchSize: null,
    invitedParticipants: [], //a list of profiles and email addresses
    files: [],
    isCoreFieldsProject: false
  }

  let fileInput = null

  const emitData = _ => {
    //confirm fields are populated
    if(formData.projectName && formData.projectName.length > 5 && formData.batchSize >= 20) {

      if(fileInput.files.length == 0) {
        alert('files need to be selected')
        return
      }

      if (fileInput.files.length > 10) {
        formData.files = fileInput.files
        dispatch('project-data', formData)
      }
      else {
        alert('it\'s only worth doing this for large number of images...')
      }
    }
    else {
      alert('invalid values')
    }
  }

  const handleInvitedParticipant = ev => {
    formData.invitedParticipants = [...formData.invitedParticipants, ev.detail]
  }

  const removeParticipant = ev => {
    const removeIndex = ev.detail
    formData.invitedParticipants.splice(removeIndex, 1)
    formData.invitedParticipants = formData.invitedParticipants //svelte
  }


</script>

<div class="flex flex-col h-full">
  <h1 class="text-xl mb-3">Create a new project</h1>
  <form class="w-full flex-1 min-h-0 p-1 pt-2 overflow-y-auto">
    <div class="relative w-full mb-2">
      <input type="text" id="projectname" class="w-full peer placeholder-transparent" placeholder="project name" bind:value={formData.projectName} />
      <label for="projectname" style="line-height: .8;" class="floating-label">project name</label>
    </div>
    <div class="mb-2 flex items-center">
      <div class="relative ">
        <input type="checkbox" id="isCoreFields" class="w-6 h-6 rounded focus:ring-0 focus:ring-offset-0" placeholder="cultivated" bind:value={formData.isCoreFieldsProject} />
        <label for="isCoreFields" class="text-slate-400 hover:cursor-help" style="line-height: .8;" >Core fields only</label>
      </div>
      <span class="text-gray-400 ml-2" title="Set to include only barcode, species name, taxon and province values for records in this project">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
      </span>
    </div>
    <div class="relative w-full mb-1">
      <textarea id="notes" class="w-full peer placeholder-transparent resize-none" rows="2" placeholder="notes" bind:value={formData.notes} />
      <label for="notes" style="line-height: .8;" class="floating-label">instructions or notes</label>
    </div>
    <div class="relative mb-3">
      <input type="number" id="batchsize" class="w-1/2 peer placeholder-transparent" min="20" step="10" placeholder="batch size" bind:value={formData.batchSize} />
      <label for="batchsize" style="line-height: .8;" class="floating-label">batch size (minimum 20)</label>
    </div>
    <InviteParticipantInput on:user={handleInvitedParticipant} />
    {#if formData.invitedParticipants.length > 0}
      <span>Invitees</span>
      <div class="relative mb-3 w-full flex flex-wrap gap-1">
        {#each formData.invitedParticipants as details, index}
          <ParticipantBadge {details} {index} on:remove={removeParticipant} />
        {/each}
      </div>
    {/if}
    <div class="relative w-full mb-3">
      <label for="imageupload">Select images for this project</label>
      <br/>
      <input type="file" name="imageupload" id="imageupload" accept="image/*" multiple bind:this={fileInput}>
    </div>
    <button type="submit" class="btn primary ml-auto" on:click|preventDefault={emitData}>Create and upload</button>
  </form>
</div>

