//Div where profile info will appear
const profileElement = document.querySelector(".overview");
//Github username
const username = "missjferrari";
//Unordered repo list
const repoList = document.querySelector(".repo-list");
//Section where all repo info appears
const repoInfoElement = document.querySelector(".repos");
//Section where individual repo data appears
const repoDataElement = document.querySelector(".repo-data");
//Button to return to repo list
const backButton = document.querySelector(".view-repos");
//Search bar
const filterInput = document.querySelector(".filter-repos");

//Fetch Github profile details
const getProfile = async function () {
    const data = await fetch(`https://api.github.com/users/${username}`);
    const profile = await data.json();
    //console.log(profile)
    showProfile(profile);
};
getProfile();

const showProfile = function (profile) {
    const div = document.createElement("div");
    div.classList.add("user-info");

    div.innerHTML = `
    <figure>
      <img alt="user avatar" src=${profile.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${profile.name}</p>
      <p><strong>Bio:</strong> ${profile.bio}</p>
      <p><strong>Location:</strong> ${profile.location}</p>
      <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
    </div>`

    profileElement.append(div);
    getRepos(username);
};

const getRepos = async function (username) {
  const repoData = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoUl = await repoData.json();
  
  repoDetails(repoUl);
};

const repoDetails =  function (repos) {
  filterInput.classList.remove("hide");
  for (const repo of repos) {
    const li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;

    repoList.append(li);
  };
};

repoList.addEventListener("click", function (e) {
  if (e.target.matches("h3")) {
    const repoName = e.target.innerText;
    getRepoInfo(repoName);
  };
});

const getRepoInfo = async function (repoName) {
  const specInfo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  const repoInfo = await specInfo.json();
  console.log(repoInfo);

  const fetchLanguages = await fetch(repoInfo.languages_url);
  const languageData = await fetchLanguages.json();
  console.log(languageData);

  const languages = [];

  for (const language in languageData) {
    languages.push(language);
  };
  console.log(languages);

  showRepoInfo(repoInfo, languages);
};

const showRepoInfo = function (repoInfo, languages) {
  repoDataElement.innerHTML = "";
  repoDataElement.classList.remove("hide");
  repoInfoElement.classList.add("hide");
  backButton.classList.remove("hide");

  const div = document.createElement("div");
  div.innerHTML = `
  <h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`

    repoDataElement.append(div);  
};

backButton.addEventListener("click", function () {
  repoInfoElement.classList.remove("hide");
  repoDataElement.classList.add("hide");
  backButton.classList.add("hide");
});

filterInput.addEventListener("input", function (e) {
  const searchText = e.target.value;
  //console.log(searchText);
  const repos = document.querySelectorAll(".repo");
  const searchTextLower = searchText.toLowerCase();

  for (const repo of repos) {
    const repoLower = repo.innerText.toLowerCase();

    if (repoLower.includes(searchTextLower)) {
      repo.classList.remove("hide");
    } else {
      repo.classList.add("hide");
    }
  }
});