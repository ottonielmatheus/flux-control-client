import base from '../../base-api';

class Auth {

  constructor() {
    let session = JSON.parse(localStorage.getItem('session'));
    this.bearer = session?.token || "";
  }

  async login(user = {}, callback) {

    const { login, password } = user;

    const userFormatted = {
      'email': login,
      'password': password
    };

    const url = `${base}/api/users/login`;
    const body = JSON.stringify(userFormatted);

    let resp = await fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body
    });

    if (resp.status === 200) {
      const session = await resp.json();
      this.bearer = session.token;
      localStorage.setItem('session', JSON.stringify(session));
    }

    callback(this.isAuthenticated());
  }

  logout() {
    localStorage.setItem('session', null);
  }

  isAuthenticated() {
    return !!this.bearer;
  }
}

export default new Auth();
