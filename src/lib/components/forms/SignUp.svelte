<script>
  import Spinner from '../elements/Spinner.svelte'; 
  import { signUpUser } from '$lib/use-cases/users'
  import  userModel from '$lib/controllers/users/userPresenter';

  let registering = false //this is signing up and creating the user profile
  let errorMessage = 'This is an error message'
  let errorDialog = null

  const attemptSignUp = async _ => {
    registering = true
    
    try {
      const userProfile = await signUpUser(userModel)
    }
    catch(err) {
      console.error(err)
      errorMessage = err.message 
      errorDialog.showModal()
    }
    
    registering = false

  }

</script>

<form class="mt-8 p-2 border rounded" autocomplete="new">
  <legend class="text-xl">
    Sign Up:
  </legend>
  <p class="text-sm font-light">
    new users
  </p>
  <div class="mt-2 flex gap-2">
    <input type="text" class="flex-1" placeholder="first/given name" autocomplete="new" bind:value={userModel.firstName}>
    <input type="text" class="flex-1" placeholder="last/family name" autocomplete="new" bind:value={userModel.lastName}>
  </div>
  <div class="mt-2 flex gap-2">
    <input type="text" class="w-3/4" placeholder="affiliation" bind:value={userModel.affiliation}>
    <input type="text" class="min-w-0 flex-1" placeholder="acronym" bind:value={userModel.affiliationAbbreviation}>

  </div>
  <div class="mt-2 flex gap-2">
    <input type="text" class="flex-1" placeholder="email" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="new" bind:value={userModel.email}>
    <input type="text" class="flex-1" placeholder="confirm email" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="new" bind:value={userModel.emailConf}>
  </div>
  <div class="my-2 flex gap-2">
    <input type="text" class="flex-1" placeholder="password" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="new" bind:this={userModel.password}>
    <input type="password" class="flex-1" placeholder="confirm password" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="new" bind:this={userModel.password}>
  </div>
  <div class="flex justify-between">
    <button class="btn border rounded" on:click|preventDefault={userModel.clear}>Clear</button>
    {#if registering}
    <Spinner />
    {:else}
    <button class="btn primary" on:click|preventDefault={attemptSignUp}>Sign Up</button>
    {/if}
  </div>
</form>
<dialog class="relative w-1/3 rounded bg-orange-300" bind:this={errorDialog}>
  <button class="absolute top-2 right-2" on:click|preventDefault={_ => errorDialog.close()}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>    
  </button>
  <div class="font-semibold">
    <p>There was a problem signing up:</p>
    <p>{errorMessage}</p>
  </div>
</dialog>