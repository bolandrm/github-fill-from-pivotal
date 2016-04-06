
function requestPivotalStories(onResult) {
  var config = JSON.parse(localStorage.getItem("config"));
  var project = config.projects[0];
  projectUsername = localStorage.getItem("pivotal-username");
  pivotalApiKey = localStorage.getItem("pivotal-api-key");
  projectId = localStorage.getItem("project-id");

  var pivotalRequestHeaders = new Headers();
  pivotalRequestHeaders.append('X-TrackerToken', project.pivotalApiKey);

  var url = 'https://www.pivotaltracker.com/services/v5/projects/'+project.pivotalId+'/stories?filter=state:started mywork:' + project.pivotalUsername;

  var request = new Request(url, { headers: pivotalRequestHeaders });

  fetch(request).then(function(response) {
    return response.json();
  }).then(function(response) {
    onResult(response);
  })
}

chrome.runtime.onMessage.addListener(function(message, sender) {
  requestPivotalStories(function(stories) {
    chrome.tabs.sendMessage(sender.tab.id, stories);
  });
});

