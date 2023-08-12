<script>

  import getDisplayDate from "../../app/utils/getDisplayDate";

  /**
   * @type {import("../../types/ProjectBatch").ProjectBatch} ProjectBatch
   */
  export let batch
  export let userID = 'asdfasdf'

  let capturProgress = Math.round(batch.recordsCaptured/batch.specimenCount * 100)
  let qcProgress = Math.round(batch.recordsChecked/batch.specimenCount * 100)

  //TODO we need to know the userID here
  //add the relevant logic: user claimed the batch or is admin, and batch is not completed
  let userCanOpen = Boolean(userID)

  const showDate = (startDate, endDate) => {
    try {
      const dateString = getDisplayDate(startDate, endDate)
      return dateString
    }
    catch(err) {
      return 'error'
    }
  }

  

</script>

<div class="relative w-60 h-[200px] p-2 border rounded shadow bg-gray-50">
  <span class="text-xl font-thin">Batch {batch.batchNumber}</span>
  <div class="relative w-full h-4 mb-4">
    <div class="h-full border rounded bg-green-300 text-sm" style="width:{capturProgress}%">
    </div>
    <div class="h-full border rounded bg-orange-300" style="width:{qcProgress}%"></div>
  </div>
  {#if batch.claimedBy}
  <div class="text-sm">claimed by: {batch.claimedBy.firstName} | {showDate(batch.claimedDate)}</div>
    {#if batch.recordsCaptured}
    <div class="text-sm">
      captured: {showDate(batch.captureStartDate, batch.captureEndDate)} 
    </div>
    {:else}
    <div class="text-sm">pending...</div>
    {/if}
  {/if}
  {#if batch.checkedBy}
  <div class="text-sm rounded bg-orange-200">
    checked by: {batch.checkedBy.firstName} | {batch.checkEndDate? showDate(batch.checkEndDate) : 'in process'}
  </div>
  {/if}
  {#if batch.claimedBy}
    {#if userCanOpen}
    <div class="absolute flex justify-end bottom-2 right-2">
      <button class="btn bg-teal-200" on:click={_ => console.log(batch)}>Open</button>
    </div>
    {/if}
  {:else}
  <div class="absolute flex justify-end bottom-2 right-2">
    <button class="btn primary">Claim</button>
  </div>
  {/if}
</div>