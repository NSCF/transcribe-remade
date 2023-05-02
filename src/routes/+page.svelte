<div>
  This is now just the home page...
  <a href="specimen">Go to image viewer</a>
  <a href="newproject">Go to project form</a>

  <form action="http://localhost:3000/imageupload" method="post"  enctype="multipart/form-data">
    <input type="text" name="projectid" id="projectid" placeholder="project id">
    <input type="file" name="imageupload" id="imageupload" accept="image/*">
    <button type="submit" class="p-2 border rounded bg-teal-500">Send file</button>
  </form>
</div>
