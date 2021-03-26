// init github
const github = new GitHub();

// init UI
const ui = new UI();

// search input
const searchUser = document.getElementById("searchUser");
const searchBtn = document.getElementById("searchBtn");

// search input's event listenser
searchBtn.addEventListener("click", (e) => {
  ui.showSpinner();
  ui.clearAutocomplete();
  // get input text
  // const userText = e.target.value;
  const userText = searchUser.value;
  console.log(userText);

  if (userText !== "") {
    // console.log(userText);

    // make http call
    github.getUser(userText).then((data) => {
      ui.removeSpinner();
      if (data.profile.message === "Not Found") {
        // show alert
        ui.showAlert("User not found!", "flash mt-3 flash-error");
      } else {
        // show the profile
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
      console.log(data);
    });
  } else {
    // clear profile
    ui.clearProfile();
  }

  e.preventDefault();
});

searchUser.addEventListener("input", (e) => {
  ui.clearAutocomplete();

  console.log(searchUser.value);
  if (searchUser.value !== "") {
    github.getAutoComplete(searchUser.value).then((data) => {
      ui.clearAutocomplete();
      console.log(data);
      ui.createAutocomplete(data);
    });
    // ui.createAutocomplete(countries.slice(0, 3));
  } else {
    ui.clearAutocomplete();
  }
});

document.getElementById("searchBar").addEventListener("click", (e) => {
  if (e.target.className === "autocomplete-item") {
    searchUser.value = e.target.textContent.split("@")[1].trim();
    ui.clearAutocomplete();
  }
});
