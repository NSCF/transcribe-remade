<script>
  import ParticipantBadge from "$lib/components/ParticipantBadge.svelte";

  let profile = {
    firstName: 'John',
    lastName: 'Snow'
  }

  let email = 'mike@gmail.com'


</script>

<ParticipantBadge details={profile} />

<ParticipantBadge details={email} />
