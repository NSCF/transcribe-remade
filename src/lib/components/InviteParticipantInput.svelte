<script>
  import { userProfiles } from '$lib/db'
  import normalizeEmail from '$lib/utils/normalizeEmail';
  import {createEventDispatcher} from 'svelte'
  const dispatch = createEventDispatcher()

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

  let inviteFieldValue = null
  let searchName = null
  let searchEmail = null
  let timer

  let userOptions = []

  //this is the debounce
  $: if(inviteFieldValue && inviteFieldValue.trim()) {
    clearTimeout(timer);
		timer = setTimeout(() => {
      userOptions = []
      searchEmail = searchName = null //reset everything
      try {
        searchEmail = normalizeEmail(inviteFieldValue.trim());
      }
      catch {
        searchName = inviteFieldValue.trim()
      }
		}, 500);
  }

  $: if(searchName || searchEmail) {
    findUserProfile().then(results => {
      userOptions = results
    })
  }

  const findUserProfile = async _ => {
    return userProfiles.query({
      $or: [ 
        { searchEmail: searchName || searchEmail } , 
        { firstName: searchName || searchEmail }, 
        { lastName: searchName || searchEmail },
        { firstName: (searchName || searchEmail).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) },
        { lastName: (searchName || searchEmail).replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}) }
       ]
    })
  }

  const dispatchValue = value => {
    userOptions = []
    searchEmail = searchName = null //reset everything
    inviteFieldValue = null
    dispatch('user', value)
  }

</script>

<div class="relative w-full mb-3">
  <input type="text" id="invite" class="w-full peer placeholder-transparent" placeholder="invite participants"  bind:value={inviteFieldValue}/>
  <label for="invite" style="line-height: .8;" class="floating-label">invite participants</label>
  {#if userOptions && userOptions.length}
    <div class="absolute bottom-8 w-full rounded-xl bg-violet-300 ">
      {#each userOptions as user}
        <div class="p-2 rounded-xl hover:bg-blue-300 hover:cursor-pointer" on:click={_ => dispatchValue(user)} on:keypress={_ => dispatchValue(user)}>invite {user.firstName + ' ' + user.lastName} </div>
        <hr class="block mx-auto w-[95%]"/>
      {/each}
    </div>
  {:else}
    {#if searchEmail != null}
    <div class="absolute bottom-8 w-full rounded-xl bg-violet-300 ">
      <div class="p-2 rounded-xl hover:bg-blue-300 hover:cursor-pointer" on:click={_ => dispatchValue(inviteFieldValue)} on:keypress={_ => dispatchValue(inviteFieldValue)}>invite new user {inviteFieldValue}</div>
      <hr class="block mx-auto w-[95%]"/>
    </div>
    {/if}
  {/if}
</div>