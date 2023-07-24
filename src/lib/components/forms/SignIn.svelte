<script>
  import Spinner from '../elements/Spinner.svelte';
  import signIn from '$lib/use-cases/users/makeSignInUser'

  let email = null
  let password = null

  let authenticating = false
  let errorMessage = 'This is an error message'
  let errorDialog = null

  const clearForm = _ => {
    email = null
    password = null
  }

  const attemptSignIn = async _ => {
    try {
      authenticating = true
      const credential = await signIn(email, password)
      authenticating = false
    }
    catch(err) {
      authenticating = false
      console.error(err)
      errorMessage = err.message 
      errorDialog.showModal()
    }
  }

</script>

<form class="mt-8 p-2 border rounded">
  <legend class="text-xl">
    Sign in:
  </legend>
  <p class="text-sm font-light">
    existing users
  </p>
  <div class="my-4 flex flex-col gap-2">
    <input type="text" name="email" id="email" placeholder="user email" bind:this={email}>
    <input type="password" name="password" id="password" placeholder="password" bind:this={password}>
  </div>
  <div class="flex justify-between">
    <button class="btn border rounded" on:click|preventDefault={clearForm}>Clear</button>
    {#if authenticating}
    <Spinner />
    {:else}
    <button class="btn primary" on:click|preventDefault={attemptSignIn}>Sign In</button>
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
    <p>There was a problem signing in:</p>
    <p>{errorMessage}</p>
  </div>
</dialog>