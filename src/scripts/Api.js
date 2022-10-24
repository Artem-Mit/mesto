import { data } from "autoprefixer";

export default class Api {
  constructor (options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _useFetch(link, newMethod = "GET", newBody) {
    return fetch(this._url+link, {method: newMethod , headers: this._headers, body: JSON.stringify(newBody)})
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => console.log(err))
  }

  getProfileInfo() {
    return this._useFetch('/users/me')
  }

  getInitialCards() {
    return this._useFetch('/cards')
  }

  editProfileInfo(data) {
    return this._useFetch('/users/me', 'PATCH', data)
  }

  postNewCard(data) {
    return this._useFetch('/cards', 'POST', data)
  }
}
