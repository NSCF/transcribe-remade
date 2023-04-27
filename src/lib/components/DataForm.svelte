<script>
  import {createEventDispatcher} from 'svelte'

  const dispatch = createEventDispatcher()

  /**
   * @type {import("../../types/Specimen").Specimen} Specimen
  */
  export let record = {
    barcode: null, accessionNumber: null, primaryCollector: null, collectorNumber: null, 
    additionalCollectors: null, collectDay: null, collectMonth: null, collectYear: null, 
    currentName: null, detName: null, qualifier: null, typeStatus: null, 
    detBy: null, detDay: null, detMonth: null, detYear: null, detNotes: null,
    country: null, province: null, locality: null, coordinates: null, 
    qds: null, altitude: null, isCultivated: false, habitat: null, generalNotes: null
  }

  //local vars
  let isQC = true
  let isType = false

/**
 * @param {Event} _ 
 */
  const emitRecord = _ => {
    dispatch('record-saved', { ...record })
  }

</script>
<div class="flex flex-col h-full">
  <!-- <h1 class="text-xl mb-3">Specimen data</h1> -->
  <form class="w-full flex-1 min-h-0 p-1 pt-2 overflow-y-auto">
    <div class="mb-3 w-full flex justify-between gap-2">
      <div class="relative">
        <input type="text" id="barcode" class="w-full peer placeholder-transparent" placeholder="barcode" bind:value={record.barcode} />
        <label for="barcode" style="line-height: .8;" class="floating-label">barcode</label>
      </div>
      <div class="relative">
        <input type="text" id="accession" class="w-full peer placeholder-transparent" placeholder="accession" bind:value={record.accessionNumber} />
        <label for="accession" style="line-height: .8;" class="floating-label">accession</label>
      </div>
      <div class="relative my-auto w-24">
        <input type="checkbox" id="istype" class="w-6 h-6 rounded focus:ring-0 focus:ring-offset-0" placeholder="istype" bind:value={isType} />
        <label for="istype" class="text-slate-400" style="line-height: .8;" >is type</label>
      </div>
    </div>
    <div class="mb-3 flex w-full gap-2">
      <div class="relative flex-1">
        <input type="text" id="collector" class="w-full peer placeholder-transparent" placeholder="collector" bind:value={record.primaryCollector} />
        <label for="collector" style="line-height: .8;" class="floating-label">collector</label>
      </div>
      <div class="relative w-1/4">
        <input type="text" id="collno" class="peer w-full placeholder-transparent" placeholder="collno" bind:value={record.collectorNumber} />
        <label for="collno" style="line-height: .8;" class="floating-label">collector no.</label>
      </div>
    </div>
    <div class="relative w-full mb-3">
      <input type="text" id="addcolls" class="w-full peer placeholder-transparent" placeholder="addcolls" bind:value={record.additionalCollectors} />
      <label for="addcolls" style="line-height: .8;" class="floating-label">additional collectors</label>
    </div>
    <div class="mb-3 max-w-full flex justify-between gap-4">
      <div class="relative w-1/3">
        <input type="text" id="collday" class="w-full peer placeholder-transparent" placeholder="collday" bind:value={record.collectDay} />
        <label for="collday" style="line-height: .8;" class="floating-label">coll. day</label>
      </div>
      <div class="relative w-1/3">
        <input type="text" id="collmonth" class="w-full peer placeholder-transparent" placeholder="collmonth" bind:value={record.collectMonth} />
        <label for="collmonth" style="line-height: .8;" class="floating-label">coll. month</label>
      </div>
      <div class="relative w-1/3">
        <input type="text" id="collyear" class="w-full peer placeholder-transparent" placeholder="collyear" bind:value={record.collectYear} />
        <label for="collyear" style="line-height: .8;" class="floating-label">coll. year</label>
      </div>
    </div>
    <div class="relative w-full mb-3">
      <input type="text" id="currenttaxon" class="w-full peer placeholder-transparent" placeholder="currenttaxon" bind:value={record.currentName} />
      <label for="currenttaxon" style="line-height: .8;" class="floating-label">current name</label>
    </div>
    {#if isQC} <!--  change to record.typeStatus != null -->
      <div class="mb-3 w-full flex justify-between gap-4">
        <div class="relative flex-1">
          <input type="text" id="dettaxon" class="w-full peer placeholder-transparent" placeholder="dettaxon" bind:value={record.detName} />
          <label for="dettaxon" style="line-height: .8;" class="floating-label">det. taxon name</label>
        </div>
        <div class="relative w-1/3">
          <input type="text" id="typestatus" class="w-full peer placeholder-transparent" placeholder="typestatus" bind:value={record.typeStatus} />
          <label for="typestatus" style="line-height: .8;" class="floating-label">type status</label>
        </div>
      </div>
    {/if}
    <div class="mb-3 flex justify-between gap-2">
      <div class="relative w-2/3 ">
        <input type="text" id="detby" class="w-full peer placeholder-transparent" placeholder="detby" bind:value={record.detBy} />
        <label for="detby" style="line-height: .8;" class="floating-label">det. by</label>
      </div>
      <div class="relative w-1/3">
        <input type="text" id="qualifier" class="peer w-full placeholder-transparent" placeholder="qualifier" bind:value={record.qualifier} />
        <label for="qualifier" style="line-height: .8;" class="floating-label">qualifier</label>
      </div>
      {#if !isQC}
        <div class="relative flex h-10 w-12 justify-center text-slate-400 border border-slate-300 rounded hover:text-white hover:bg-slate-300 hover:cursor-pointer" title="det notes">
          <span class="my-auto">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>  
          </span>
          <span class="absolute right-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>          
          </span>      
        </div>
      {/if}
    </div>
    <div class="mb-3 w-full flex justify-between gap-2">
      <div class="relative w-1/3">
        <input type="text" id="detday" class="w-full peer placeholder-transparent" placeholder="detday" bind:value={record.detDay} />
        <label for="detday" style="line-height: .8;" class="floating-label">det. day</label>
      </div>
      <div class="relative w-1/3">
        <input type="text" id="detmonth" class="w-full peer placeholder-transparent" placeholder="detmonth" bind:value={record.detMonth} />
        <label for="detmonth" style="line-height: .8;" class="floating-label">det. mon</label>
      </div>
      <div class="relative w-1/3">
        <input type="text" id="detyear" class="w-full peer placeholder-transparent" placeholder="detyear" bind:value={record.detYear} />
        <label for="detyear" style="line-height: .8;" class="floating-label">det. year</label>
      </div>
      
    </div>
    {#if isQC}
      <div class="relative w-full mb-3">
        <input type="text" id="detnotes" class="w-full peer placeholder-transparent" placeholder="detnotes" bind:value={record.detNotes} />
        <label for="detnotes" style="line-height: .8;" class="floating-label">det. notes</label>
      </div>
    {/if}
    <div class="mb-3 w-full flex justify-between gap-2">
      <div class="relative flex-shrink">
        <input type="text" id="country" class="w-full peer placeholder-transparent" placeholder="country" bind:value={record.country} />
        <label for="country" style="line-height: .8;" class="floating-label">country</label>
      </div>
      <div class="relative flex-shrink">
        <input type="text" id="province" class="w-full peer placeholder-transparent" placeholder="province" bind:value={record.province} />
        <label for="province" style="line-height: .8;" class="floating-label">province</label>
      </div>
    </div>
    <div class="relative w-full mb-1">
      <textarea id="locality" class="w-full peer placeholder-transparent resize-none" rows="2" placeholder="locality" bind:value={record.locality} />
      <label for="locality" style="line-height: .8;" class="floating-label">locality</label>
    </div>
    <!-- <div class="flex gap-6">
      <label for="" class="flex-grow text-slate-400">latitude</label>
      <label for="" class="flex-grow text-slate-400">longitude</label>
    </div>
    <div class="mb-3 w-full flex justify-between gap-2">
      <div class="relative flex-shrink">
        <input type="text" id="latdeg" class="w-full peer placeholder-transparent" placeholder="latdeg"/>
        <label for="latdeg" style="line-height: .8;" class="floating-label">deg</label>
      </div>
      <div class="relative flex-shrink">
        <input type="text" id="latmin" class="w-full peer placeholder-transparent" placeholder="latmin"/>
        <label for="latmin" style="line-height: .8;" class="floating-label">min</label>
      </div>
      <div class="relative flex-shrink">
        <input type="text" id="lastsec" class="w-full peer placeholder-transparent" placeholder="lastsec"/>
        <label for="lastsec" style="line-height: .8;" class="floating-label">sec</label>
      </div>
      <div class="relative flex-shrink">
        <input type="text" id="latdir" class="w-full peer placeholder-transparent" pattern="N|S" placeholder="latdir"/>
        <label for="latdir" style="line-height: .8;" class="floating-label">NS</label>
      </div>
      <div class="relative flex-shrink">
        <input type="text" id="londeg" class="w-full peer placeholder-transparent" placeholder="londeg"/>
        <label for="londeg" style="line-height: .8;" class="floating-label">deg</label>
      </div>
      <div class="relative flex-shrink">
        <input type="text" id="lonmin" class="w-full peer placeholder-transparent" placeholder="lonmin"/>
        <label for="lonmin" style="line-height: .8;" class="floating-label">min</label>
      </div>
      <div class="relative flex-shrink">
        <input type="text" id="longsec" class="w-full peer placeholder-transparent" placeholder="longsec"/>
        <label for="longsec" style="line-height: .8;" class="floating-label">sec</label>
      </div>
      <div class="relative flex-shrink">
        <input type="text" id="londir" class="w-full peer placeholder-transparent" pattern="E|W" placeholder="londir"/>
        <label for="londir" style="line-height: .8;" class="floating-label">EW</label>
      </div>
    </div> -->
    <div class="relative w-full mb-3">
      <input type="text" id="coords" class="w-full peer placeholder-transparent" placeholder="coords" bind:value={record.coordinates} />
      <label for="coords" style="line-height: .8;" class="floating-label">coordinates</label>
    </div>
    <div class="mb-3 max-w-full flex justify-between">
      <div class="relative w-1/4">
        <input type="text" id="qds" class="w-full peer placeholder-transparent" placeholder="qds" bind:value={record.qds} />
        <label for="qds" style="line-height: .8;" class="floating-label">QDS</label>
      </div>
      <div class="relative w-1/4">
        <input type="text" id="altitude" class="w-full peer placeholder-transparent" placeholder="altitude" bind:value={record.altitude} />
        <label for="altitude" style="line-height: .8;" class="floating-label">altitude</label>
      </div>
      <div class="relative my-auto mr-4">
        <input type="checkbox" id="cultivated" class="w-6 h-6 rounded focus:ring-0 focus:ring-offset-0" placeholder="cultivated" bind:value={record.isCultivated} />
        <label for="cultivated" class="text-slate-400" style="line-height: .8;" >cultivated</label>
      </div>
    </div>
    <div class="relative w-full mb-3">
      <input type="text" id="habitat" class="w-full peer placeholder-transparent" placeholder="habitat" bind:value={record.habitat} />
      <label for="habitat" style="line-height: .8;" class="floating-label">habitat</label>
    </div>
    <div class="relative w-full mb-3">
      <input type="text" id="notes" class="w-full peer placeholder-transparent" placeholder="notes" bind:value={record.generalNotes} />
      <label for="notes" style="line-height: .8;" class="floating-label">general notes</label>
    </div>
    <button class="btn submit ml-auto" on:click={emitRecord}>Save record</button>
  </form>
</div>