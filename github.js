class GitHub {
  constructor() {
    this.client_id = "c90195f4280c94174fcb";
    this.client_secret = "b4f425c39497f38852fcfc8c888db686a4fa878c";
    this.PAT = "38f9640db762d0085f5df859a3fe422430eed0d1";
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
