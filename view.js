var projectIdInput = document.getElementById("project-id-input");
var pivotalApiKeyInput = document.getElementById("pivotal-api-key-input");
var pivotalUsernameInput = document.getElementById("pivotal-username-input");
var saveButton = document.getElementById("save-button");

var config = localStorage.getItem("config");
if(config) {
  var project = JSON.parse(config).projects[0];
  projectIdInput.value = project.pivotalId;
  pivotalApiKeyInput.value = project.pivotalApiKey;
  pivotalUsernameInput.value = project.pivotalUsername;
}

saveButton.addEventListener("click", function() {
  localStorage.setItem("config", JSON.stringify({
    projects: [
      {
        pivotalApiKey: pivotalApiKeyInput.value,
        pivotalUsername: pivotalUsernameInput.value,
        pivotalId: projectIdInput.value
      }
    ]
  }));
});
