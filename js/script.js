//Div where profile info will appear
const profileElement = document.querySelector(".overview");
//Github username
const username = "missjferrari";
//Unordered repo list
const repoList = document.querySelector(".repo-list");

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
    getRepos();
};

const getRepos = async function () {
  const repoData = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  const repoUl = await repoData.json();
  
  repoDetails(repoUl);
};

const repoDetails =  function (repos) {
  
  for (const repo of repos) {
    let li = document.createElement("li");
    li.classList.add(".repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;

    repoList.append(li);
  };
};
//repoDetails();