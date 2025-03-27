class UsersTokenStorage {
  private tokens = new Map<string, string>();
  private static instance: UsersTokenStorage;

  constructor() {
    if (UsersTokenStorage.instance) {
      return UsersTokenStorage.instance;
    }

    return UsersTokenStorage.instance = this;
  }

  addToken(username: string, token: string) {
    this.tokens.set(username, this.formatToken(token));
  }

  getToken(username?: string) {
    return username
      ? this.tokens.get(username) as string
      : this.getLastAddedToken() as string;
  }

  removeToken(username?: string) {
    username
      ? this.tokens.delete(username)
      : this.tokens.delete(this.getLastAddedUserName() as string);
  }

  private formatToken(token: string, prefix: string = 'Bearer') {
    return `${prefix} ${token}`.trim();
  }

  private getLastAddedUserName() {
    return [...this.tokens.keys()].pop();
  }

  private getLastAddedToken() {
    return [...this.tokens.values()].pop();
  }
}

export default new UsersTokenStorage();