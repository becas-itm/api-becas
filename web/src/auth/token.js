class Token {
  token = null;

  expiresIn = 0;

  get exists() {
    return !!this.token;
  }

  setToken(value, expiresIn) {
    this.token = value;
    this.expiresIn = expiresIn;
  }

  getToken() {
    return this.token;
  }

  clean() {
    this.token = null;
    this.expiresIn = 0;
  }

  getExpiresIn() {
    return this.expiresIn;
  }
}

export default new Token();
