<script>
  import Spinner from '$lib/components/Spinner.svelte'; 
  import { newUser } from '$lib/stores/newUser';
  import signUpController from '$adapters/users/signUpUserController';

  let registering = false
  let submitAttempt = false
  let errorMessage = 'This is an error message'
  let errorDialog = null
  let form = null

  const attemptSignUp = async _ => {
    registering = true
    
    try {
      const userProfile = await signUpController.signUpUser($newUser)
    }
    catch(err) {
      submitAttempt = true
      errorMessage = err.message 
      errorDialog.showModal()
    }
    
    registering = false

  }

  const clearForm = _ => {
    submitAttempt = false
    $newUser.clear()
    form.reset() //we need this because svelte can't see the changes from $newUser.clear()
  }

</script>

<form class="mt-8 p-2 border rounded" autocomplete="new" bind:this={form}>
  <legend class="text-xl">
    Sign Up:
  </legend>
  <p class="text-sm font-light">
    new users (* required fields)
  </p>
  <div class="mt-2 flex gap-2">
    <input type="text" class="flex-1 ring-red-500" class:ring-2={submitAttempt && !$newUser.firstNameIsValid()} placeholder="first/given name*" autocomplete="new" bind:value={$newUser.firstName}>
    <input type="text" class="flex-1 ring-red-500" placeholder="last/family name*" autocomplete="new" bind:value={$newUser.lastName}>
  </div>
  <div class="mt-2 flex gap-2">
    <input type="text" class="w-3/4 ring-red-500" placeholder="affiliation" bind:value={$newUser.affiliation}>
    <input type="text" class="min-w-0 flex-1 ring-red-500" placeholder="acronym" bind:value={$newUser.affiliationAbbreviation}>
  </div>
  <div class="mt-2 flex gap-2">
    <input type="text" class="flex-1 ring-red-500" class:ring-2={submitAttempt && !$newUser.emailIsValid()} placeholder="email*" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="new" bind:value={$newUser.email}>
    <input type="text" class="flex-1 ring-red-500" class:ring-2={submitAttempt && !$newUser.emailsMatch()} placeholder="confirm email*" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="new" bind:value={$newUser.emailConf}>
  </div>
  <div class="my-2 flex gap-2">
    <input type="password" class="flex-1 ring-red-500" class:ring-2={submitAttempt && !$newUser.passwordIsValid()} placeholder="password*" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="new" bind:value={$newUser.password}>
    <input type="password" class="flex-1 ring-red-500" class:ring-2={submitAttempt && !$newUser.passwordsMatch()} placeholder="confirm password*" onselectstart="return false" onpaste="return false" onCopy="return false" onCut="return false" onDrag="return false" onDrop="return false" autocomplete="new" bind:value={$newUser.passwordConf}>
  </div>
  <div class="flex justify-between">
    <button class="btn border rounded" on:click|preventDefault={clearForm}>Clear</button>
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
  <div class="text-center"> 
    <p class="font-semibold">There was a problem signing up: </p>
    <p>{errorMessage}</p>
  </div>
</dialog>