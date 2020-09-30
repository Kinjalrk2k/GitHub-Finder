class GitHub {
  constructor() {
    this.client_id = "";
    this.client_secret = "";
    this.PAT = "";
    this.repos_count = 6;
    this.repos_sort = "created: asc";
  }

  async getUser(user) {
    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?client_id=${this.client_id}&client_secret=${this.client_secret}`,
      {
        headers: new Headers({
          Authorization: `token ${this.PAT}`,
        }),
      }
    );

    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?per_page=${this.repos_count}&sort=${this.repos_sort}client_id=${this.client_id}&client_secret=${this.client_secret}`,
      {
        headers: new Headers({
          Authorization: `token ${this.PAT}`,
        }),
      }
    );

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos,
    };
  }

  async getAutoComplete(query) {
    const resResponse = await fetch(
      `https://api.github.com/search/users?q=${query}&client_id=${this.client_id}&client_secret=${this.client_secret}`,
      {
        headers: new Headers({
          Authorization: `token ${this.PAT}`,
        }),
      }
    );

    const res = await resResponse.json();
    return res.items.slice(0, 3);
  }
}
