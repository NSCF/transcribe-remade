<script>

</script>
<div class="flex flex-col h-full">
  <!-- <h1 class="text-xl mb-3">Specimen data</h1> -->
  <form class="w-full flex-1 min-h-0 p-1 overflow-y-auto">
    <div class="mb-3 w-full flex justify-between gap-2">
      <div class="relative flex-shrink">
        <input type="text" id="barcode" class="w-full peer placeholder-transparent" placeholder="barcode"/>
        <label for="barcode" style="line-height: .8;" class="floating-label">barcode</label>
      </div>
      <div class="relative flex-shrink">
        <input type="text" id="accession" class="w-full peer placeholder-transparent" placeholder="accession"/>
        <label for="accession" style="line-height: .8;" class="floating-label">accession</label>
      </div>
    </div>
    <div class="mb-3 flex justify-between gap">
      <div class="relative w-2/3 mr-2 ">
        <input type="text" id="collector" class="w-full peer placeholder-transparent" placeholder="collector"/>
        <label for="collector" style="line-height: .8;" class="floating-label">collector</label>
      </div>
      <div class="relative">
        <input type="text" id="collno" class="peer placeholder-transparent" placeholder="collno"/>
        <label for="collno" style="line-height: .8;" class="floating-label">collector no.</label>
      </div>
    </div>
    <div class="relative w-full mb-3">
      <input type="text" id="addcolls" class="w-full peer placeholder-transparent" placeholder="addcolls"/>
      <label for="addcolls" style="line-height: .8;" class="floating-label">additional collectors</label>
    </div>
    <div class="mb-3 max-w-full flex justify-between gap-4">
      <div class="relative w-1/3">
        <input type="text" id="collday" class="w-full peer placeholder-transparent" placeholder="collday"/>
        <label for="collday" style="line-height: .8;" class="floating-label">coll. day</label>
      </div>
      <div class="relative w-1/3">
        <input type="text" id="collmonth" class="w-full peer placeholder-transparent" placeholder="collmonth"/>
        <label for="collmonth" style="line-height: .8;" class="floating-label">coll. month</label>
      </div>
      <div class="relative w-1/3">
        <input type="text" id="collyear" class="w-full peer placeholder-transparent" placeholder="collyear"/>
        <label for="collyear" style="line-height: .8;" class="floating-label">coll. year</label>
      </div>
    </div>
    <div class="relative w-full mb-3">
      <input type="text" id="dettaxon" class="w-full peer placeholder-transparent" placeholder="dettaxon"/>
      <label for="dettaxon" style="line-height: .8;" class="floating-label">det. taxon</label>
    </div>
    <div class="mb-3 w-full flex justify-between gap-2">
      <div class="relative grow">
        <input type="text" id="qualifier" class="w-full peer placeholder-transparent" placeholder="qualifier"/>
        <label for="qualifier" style="line-height: .8;" class="floating-label">qualifier</label>
      </div>
      <div class="relative w-1/5">
        <input type="text" id="detday" class="w-full peer placeholder-transparent" placeholder="detday"/>
        <label for="detday" style="line-height: .8;" class="floating-label">det. day</label>
      </div>
      <div class="relative w-1/5">
        <input type="text" id="detmonth" class="w-full peer placeholder-transparent" placeholder="detmonth"/>
        <label for="detmonth" style="line-height: .8;" class="floating-label">det. mon</label>
      </div>
      <div class="relative w-1/5">
        <input type="text" id="detyear" class="w-full peer placeholder-transparent" placeholder="detyear"/>
        <label for="detyear" style="line-height: .8;" class="floating-label">det. year</label>
      </div>
    </div>
    <div class="relative w-full mb-3">
      <input type="text" id="detnotes" class="w-full peer placeholder-transparent" placeholder="detnotes"/>
      <label for="detnotes" style="line-height: .8;" class="floating-label">det. notes</label>
    </div>
    <div class="mb-3 w-full flex justify-between gap-2">
      <div class="relative flex-shrink">
        <input type="text" id="country" class="w-full peer placeholder-transparent" placeholder="country"/>
        <label for="country" style="line-height: .8;" class="floating-label">country</label>
      </div>
      <div class="relative flex-shrink">
        <input type="text" id="province" class="w-full peer placeholder-transparent" placeholder="province"/>
        <label for="province" style="line-height: .8;" class="floating-label">province</label>
      </div>
    </div>
    <div class="relative w-full mb-1">
      <textarea id="locality" class="w-full peer placeholder-transparent resize-none" rows="2" placeholder="locality"/>
      <label for="locality" style="line-height: .8;" class="floating-label">locality</label>
    </div>
    <div class="flex gap-6">
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
    </div>
    <div class="mb-3 max-w-full flex justify-between">
      <div class="relative w-1/4">
        <input type="text" id="qds" class="w-full peer placeholder-transparent" placeholder="qds"/>
        <label for="qds" style="line-height: .8;" class="floating-label">QDS</label>
      </div>
      <div class="relative w-1/4">
        <input type="text" id="altitude" class="w-full peer placeholder-transparent" placeholder="altitude"/>
        <label for="altitude" style="line-height: .8;" class="floating-label">altitude</label>
      </div>
      <div class="relative my-auto mr-4">
        <input type="checkbox" id="cultivated" class="w-6 h-6 rounded focus:ring-0 focus:ring-offset-0" placeholder="cultivated"/>
        <label for="cultivated" class="text-slate-400" style="line-height: .8;" >cultivated</label>
      </div>
    </div>
    <div class="relative w-full mb-3">
      <input type="text" id="habitat" class="w-full peer placeholder-transparent" placeholder="habitat"/>
      <label for="habitat" style="line-height: .8;" class="floating-label">habitat</label>
    </div>
    <button class="btn submit ml-auto">Save record</button>
  </form>
</div>