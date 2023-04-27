<script>
  import "../app.css";

</script>

<div class="flex flex-col w-screen h-screen overflow-hidden bg-slate-100">
  <nav class="h-12 p-2 flex justify-between items-center bg-teal-300">
    <div>
      <span class="text-xl font-extralight">NSCF Scriber</span>
    </div>
    <div>
      <a href="/" class="btn primary">Home</a>
      <a href="/addproject" class="btn primary">Projects</a>
      <a href="/signin" class="btn primary">Sign in</a>
    </div>
  </nav>
  <div class="p-2 w-full flex-1 min-h-0 border rounded">
    <slot />
  </div>
  
</div>
