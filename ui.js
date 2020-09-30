class UI {
  constructor() {
    this.profile = document.getElementById("profile");
    this.reposSection = document.getElementById("repos");
  }

  showProfile(user) {
    this.profile.innerHTML = `
      <div class="Box box-shadow-large p-3 mt-5">
        <div class="Box-row d-flex flex-justify-between">
          <h3 class="m-0">${user.login}</h3>
          <a href="${user.html_url}" class="btn btn-primary mt-2">View Profile</a>
        </div>
        <div class="Box-row d-flex">
          <div class="col-6 m-2">
            <img
              class="avatar"
              src="${user.avatar_url}"
              alt=""
              width="100%"
            />
          </div>
          <div class="col-6 m-2">
            <div class="Subhead-heading">${user.name}</div>

            <span class="State bg-blue mt-2">Public <span class="iconify" data-icon="octicon:repo-16" data-inline="false"></span></span>
            <span class="Counter mr-1 Counter--gray">${user.public_repos}</span>
            <br />
            <span class="State bg-purple mt-2">Public <span class="iconify" data-icon="octicon:logo-gist-16" data-inline="false"></span></span>
            <span class="Counter mr-1 Counter--gray">${user.public_gists}</span>
            <br />
            <span class="State State--green mt-2"><span class="iconify" data-icon="octicon-mention-16" data-inline="false"></span> Followers</span>
            <span class="Counter mr-1 Counter--gray">${user.followers}</span>
            <br />
            <span class="State bg-orange mt-2"><span class="iconify" data-icon="octicon:people-16" data-inline="false"></span> Following</span>
            <span class="Counter mr-1 Counter--gray">${user.following}</span>
          </div>
        </div>
        <div class="Subhead">
          <div class="Subhead-description">${user.bio}</div>
        </div>
        <div class="Box-row Box-row--unread">
          <span class="iconify" data-icon="octicon:location-16" data-inline="false"></span> ${user.location}
        </div>
        <div class="Box-row Box-row--unread">
        <span class="iconify" data-icon="octicon:briefcase-16" data-inline="false"></span> ${user.company}
        </div>
      </div>
    `;
  }

  clearProfile() {
    this.profile.innerHTML = "";
    this.reposSection.innerHTML = "";
  }

  showAlert(msg, className) {
    this.clearAlert();

    const div = document.createElement("div");
    div.classList = className;
    div.appendChild(document.createTextNode(msg));

    // const container = document.getElementById("profile");
    // const profile = document.getElementById("user");
    // container.insertBefore(div, profile);

    const par = document.getElementById("error");
    par.className = "p-4";
    par.appendChild(div);

    // timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".flash");
    if (currentAlert) {
      currentAlert.remove();
    }
    const par = (document.getElementById("error").className = "");
  }

  showRepos(repos) {
    let output = `
    <div class="Box box-shadow-large mt-5">
      <div class="Box-row d-flex flex-justify-between">
          <h3 class="m-0">Recent Repos</h3>
      </div>
      <div class="d-flex flex-wrap flex-justify-around">
    `;

    repos.forEach((repo) => {
      output += `
      <div class="Box col-5 m-3">
        <div class="Box-header">
          <h3 class="Box-title">
          <a href="${repo.html_url}">${repo.name}</a>
          </h3>
        </div>
        <div class="Box-row Box-row--unread">
          Language: ${repo.language}
        </div>
        <div class="Box-row">
          ${repo.description}
        </div>
        <div class="Box border-dashed p-2 m-2 d-flex flex-justify-around">
          <div class"col-4">
            <span class="Counter mr-1">
              <span class="iconify" data-icon="octicon:star-fill-16" data-inline="false"></span>
              ${repo.stargazers_count}
            </span>
          </div>
          <div class"col-4">
            <span class="Counter mr-1">
              <span class="iconify" data-icon="octicon:eye-16" data-inline="false"></span>
              ${repo.watchers_count}
            </span>
          </div>
          <div class"col-4">
            <span class="Counter mr-1">
              <span class="iconify" data-icon="octicon:repo-forked-16" data-inline="false"></span>
              ${repo.forks_count}
            </span>
          </div>
        </div>
      </div>
      `;
    });

    output += `
        </div>
      </div>
    `;

    this.reposSection.innerHTML = output;
  }

  clearAutocomplete() {
    const ul = document.querySelector(".autocomplete-results");
    if (ul) {
      ul.remove();
    }
  }

  createAutocomplete(users) {
    const ul = document.createElement("ul");
    ul.classList = "autocomplete-results mt-12";

    let output = "";

    users.forEach((user) => {
      output += `
        <li class="autocomplete-item">
        <img src="${user.avatar_url}" width="20" class="avatar mr-1">
          @${user.login}
        </li>
      `;
    });

    ul.innerHTML = output;

    const searchUser = document.getElementById("searchUser");
    const searchBar = document.getElementById("searchBar");
    searchBar.insertBefore(ul, searchUser);
  }
}
