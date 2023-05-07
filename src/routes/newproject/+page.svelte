<script>

  import ProjectForm from "$lib/components/ProjectForm.svelte";
  import { projects, projectParticipants, existingUserProjects, newUserProjects } from '$lib/db'
  import { makeID } from "$lib/utils/makeID";

  export let user = null

  /**
   * @type {import("../../types/Project").Project}
  */
  let projectRecord = {
    projectID: null, 
    projectName: null,
    notes: null,
    createdBy: null,
    createdDate: null,
    specimenCount: 0,
    batchSize: null,
    batchCount: 0,
    capturedRecordCount: 0,
    checkedRecordCount: 0,
    isCompleted: false, //is the project closed off (captured and checked)
    completedBy: null,
    completedDate: null
  }

  /**
   * @type {import("../../types/ProjectParticipants").ProjectParticipants}
   */
  let projectParticipantsRecord = {
    invitedExistingUsers: [],
    invitedNewUsers: [],
    currentParticipants: [],
    declinedParticipants: [],
    previousParticipants: []
  }

  let uploading = false
  let uploadFiles = []
  let duplicateFileNames = []

  const handleProjectData = async ev => {
    uploadFiles = ev.detail.files 
    delete ev.detail.files
    Object.assign(projectRecord, ev.detail)
    await createProject()
  }

  const allocateParticipants = invitedParticipants => {
    for (const participant of invitedParticipants){
      if (typeof participant == 'object') {
        projectParticipantsRecord.invitedExistingParticipants.push(participant.userID)
      }
      
      if (typeof participant == 'string') { //these are the emails
        projectParticipantsRecord.invitedNewParticipants.push(participant)
      }
    }
  }

  const updateParticipantsProjectLists = async _ => {
    for (const existingUserID of projectParticipantsRecord.invitedExistingUsers){
      /**
       * @type {import("../../types/ExistingUserProjects").ExistingUserProjects}
       */
      let userProjects = await existingUserProjects.get(existingUserID)
      if (userProjects) {
        userProjects.invitedProjects.push(projectRecord.projectID)
      }
      else {
        userProjects = {
          invitedProjects: [projectRecord.projectID],
          acceptedProjects: []
        }
      }
      await existingUserProjects.set(existingUserID, userProjects)
    }

    for (const normalizedEmail of projectParticipantsRecord.invitedNewUsers) {
      /**
       * @type {import("../../types/NewUserProjects").NewUserProjects}
       */
      let userProjects = await newsUserProjects.get(normalizedEmail)
      if (userProjects) {
        userProjects.invitedProjects.push(projectRecord.projectID)
      }
      else {
        userProjects = {
          invitedProjects: [projectRecord.projectID]
        }
      }
      await newUserProjects.set(normalizedEmail, userProjects)
    }
  }

  const checkFilesUnique = _ => {
    const fileNames = Array.from(uploadFiles).map(file => file.name)
    duplicateFileNames = fileNames.filter((elem, pos) => { arr.indexOf(elem) == pos })
    if(duplicateFileNames.length > 0) {
      const confirmed = confirm('there are duplicate file names in the files selected, confirm if you want to continue')
      return confirmed
    }

  }

  const createProject = async _ => {
    
    //check that file names are unique, remove those that are not (confirm with user)

    const continueCreateProject = checkFilesUnique()
    if (continueCreateProject) {
      //add an ID 
      projectRecord.projectID = makeID()
      projectRecord.createdBy = user?.uid 
      projectRecord.createdDate = Date.now()

      //save the project  on firestore
      console.log('running createProject')
      try {
        projects.add(projectRecord)
      }
      catch(err){
        console.error(err.message)
      }

      //update the participants invited lists


      //send the images with a progress bar
  
    }
  }

  const uploadImages = _ => {
    //NOTE this will create the specimen records and specimenImage records also... and probably batch records too...
    const specimenTracker = new Set() //todo update record.specimenCount with this at the end
    const imageBarcode = filename.replace(/\.[^/.]+$/, "") 
    const specimenID = filebasename.split(/[-_]/)[0].replace(/[a-z]^/i, '') //like dwc:occurrenceID except that it's not
    //TODO etc...
  }


</script>

<div class="w-1/2 mx-auto">
  <ProjectForm on:project-data={handleProjectData} />
  {#if duplicateFileNames.length > 0}
    <div class="relative mb-3 w-full flex flex-wrap gap-1">
      {#each duplicateFileNames as fileName}
        <span class="p-2 rounded bg-orange-300">{fileName}</span>
      {/each}
    </div>
  {/if}
  {#if uploading}
    <div>
      Image upload progress...
    </div>
    <div id="progress" class="relative w-full h-4 border rounded">
      <div class="absolute w-1/3 h-4 bg-teal-500"></div>
    </div>
  {/if}
</div>