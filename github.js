
function closeIt() {
  el = document.getElementById("choose-story-dialog");
  el.parentNode.removeChild(el);
}

function onChooseStory(story) {
  closeIt();
  var pullRequestTitle = document.getElementById("pull_request_title");
  pullRequestTitle.value = story.name + " [Finishes #"+story.id+"]";

  var pullRequestBody = document.getElementById("pull_request_body");
  pullRequestBody.value = story.url;
}

function createStory(story) {
  var storyRow = document.createElement('div');
  storyRow.className = "story";

  var storyTitle = document.createElement('div');
  storyTitle.className = "story-title";
  storyTitle.innerHTML = story.name;
  storyRow.appendChild(storyTitle);

  var button = document.createElement('button');
  button.innerHTML = "choose";
  storyRow.appendChild(button);

  button.addEventListener('click', function() {
    onChooseStory(story);
  });

  return storyRow;
}

function createDialogHeader(name) {
  var header = document.createElement('div');
  header.className = "dialog-header";

  var headerText = document.createElement('div');
  headerText.className = "dialog-header-text";
  headerText.innerHTML = name;
  header.appendChild(headerText);

  var button = document.createElement('button');
  button.className = "cancel-button";
  button.innerHTML = "cancel";
  header.appendChild(button);

  button.addEventListener('click', function() {
    closeIt();  
  });

  return header;
}

function createChooseStoryDialog() {
  var popup = document.createElement('div');
  popup.id = "choose-story-dialog";
  popup.className = "choose-story-dialog";

  popup.appendChild(createDialogHeader('Autofill Story'));

  chrome.runtime.onMessage.addListener(function(stories) {
    for(var i = 0; i < stories.length; i++) {
      var story = stories[i];
      popup.appendChild(createStory(story));
    }
  });

  chrome.runtime.sendMessage({ action: "get-stories" });

  return popup;
}

function addFillFromPivotalButtonToPage() {
  var after = document.getElementsByClassName("form-actions")[0];
  var chooseStoryButton = document.createElement('span');
  chooseStoryButton.id = "testing";
  chooseStoryButton.className = "btn";
  chooseStoryButton.innerHTML = "Fill from Pivotal";
  after.appendChild(chooseStoryButton);

  var dialogContainer = document.createElement('div');
  dialogContainer.id = "dialog-container";
  var mainContent = document.querySelectorAll(".discussion-timeline")[0];
  mainContent.appendChild(dialogContainer);

  chooseStoryButton.addEventListener('click', function(e) {
    var popup = createChooseStoryDialog();
    dialogContainer.appendChild(popup);
  });
}

var githubHeader = document.getElementsByClassName("gh-header-new-pr");
if(githubHeader.length > 0) {
  addFillFromPivotalButtonToPage();
}
