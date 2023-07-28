<script>
  import "../app.css";
  
  //and we need to initialize firebase
  import firebaseApp from '../db/firebase/firebaseapp'

  

</script>

<div class="flex flex-col w-screen h-screen overflow-hidden bg-slate-100">
  <nav class="h-12 p-2 flex justify-between items-center bg-teal-300">
    <div>
      <a href="/" class="text-xl font-extralight">NSCF Scriber</a>
    </div>
    <div>
      <a href="/" class="btn nav">Home</a>
      <a href="/projects" class="btn">Projects</a>
      <a href="/signin" class="btn">Sign in</a>
      <a href="/signup" class="btn primary">Sign up</a>
    </div>
  </nav>
  <div class="p-2 w-full flex-1 min-h-0 border rounded">
    <slot />
  </div>
  
</div>
