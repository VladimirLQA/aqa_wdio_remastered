export interface TokenTypes {
  formated: string;
  raw: string;
}

class UsersToken {
  private tokens = new Map<string, TokenTypes>();
  private static instance: UsersToken;

  constructor() {
    if (UsersToken.instance) {
      return UsersToken.instance;
    }

    return (UsersToken.instance = this);
  }

  addToken(username: string, token: string) {
    this.tokens.set(username, { formated: this.formatToken(token), raw: token });
  }

  getToken(options: { type?: keyof TokenTypes; username?: string } = {}) {
    const { type = 'formated', username } = options;
    const tokenObj = username
      ? (this.tokens.get(username) as TokenTypes)
      : (this.getLastAddedToken() as TokenTypes);
    return tokenObj[type];
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

export default new UsersToken();
