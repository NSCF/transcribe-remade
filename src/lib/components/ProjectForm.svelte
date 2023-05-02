<script>
  import InviteParticipantInput from "./InviteParticipantInput.svelte";
  import ParticipantBadge from "./ParticipantBadge.svelte";
  import { createEventDispatcher } from "svelte";
  const dispatch = createEventDispatcher()

  let record = {
    projectName: null,
    notes: null,
    batchSize: null,
    invitedParticipants: [], //a list of profiles and email addresses
    files: []
  }

  let fileInput = null

  const emitData = _ => {
    //confirm fields are populated
    if(record.projectName && record.projectName.length > 5 && record.batchSize >= 20) {

      if(fileInput.files.length == 0) {
        alert('files need to be selected')
        return
      }

      if (fileInput.files.length > 10) {
        record.files = fileInput.files
        dispatch('project-data', record)
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
    record.invitedParticipants = [...record.invitedParticipants, ev.detail]
  }

  const removeParticipant = ev => {
    const removeIndex = ev.detail
    record.invitedParticipants.splice(removeIndex, 1)
    record.invitedParticipants = record.invitedParticipants //svelte
  }

</script>

<div class="flex flex-col h-full">
  <h1 class="text-xl mb-3">Create a new project</h1>
  <form class="w-full flex-1 min-h-0 p-1 pt-2 overflow-y-auto">
    <div class="relative w-full mb-3">
      <input type="text" id="projectname" class="w-full peer placeholder-transparent" placeholder="project name" bind:value={record.projectName} />
      <label for="projectname" style="line-height: .8;" class="floating-label">project name</label>
    </div>
    <div class="relative w-full mb-1">
      <textarea id="notes" class="w-full peer placeholder-transparent resize-none" rows="2" placeholder="notes" bind:value={record.notes} />
      <label for="notes" style="line-height: .8;" class="floating-label">instructions or notes</label>
    </div>
    <div class="relative mb-3">
      <input type="number" id="batchsize" class="peer placeholder-transparent" min="20" step="10" placeholder="batch size" bind:value={record.batchSize} />
      <label for="batchsize" style="line-height: .8;" class="floating-label">batch size (minimum 20)</label>
    </div>
    <InviteParticipantInput on:user={handleInvitedParticipant} />
    {#if record.invitedParticipants.length > 0}
      <div class="relative mb-3 w-full flex flex-wrap gap-1">
        {#each record.invitedParticipants as details, index}
          <ParticipantBadge {details} {index} on:remove={removeParticipant} />
        {/each}
      </div>
    {/if}
    <div class="relative w-full mb-3">
      <label for="imageupload">Select images for this project</label>
      <input type="file" name="imageupload" id="imageupload" accept="image/*" multiple bind:this={fileInput}>
    </div>
    <button type="submit" class="block ml-auto p-2 border rounded bg-teal-300" on:click|preventDefault={emitData}>Create and upload</button>
  </form>
</div>

