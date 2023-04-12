<script>
  import "../app.css";
</script>

<div class="flex flex-col w-screen h-screen overflow-hidden bg-slate-100">
  <nav class="h-12 p-2 flex justify-between items-center bg-teal-300">
    <div>
      <span class="text-xl font-extralight">NSCF Transcriber</span>
    </div>
    <div>
      <button class="btn primary">Home</button>
      <button class="btn primary">Sign in</button>
    </div>
  </nav>
  <div class="p-2 flex-1 min-h-0 border rounded">
    <slot />
  </div>
  
</div>
