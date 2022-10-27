export default class Api {
  constructor (options) {
    this._url = options.url;
    this._headers = options.headers;
  }

  _useFetch(link, newMethod = "GET", newBody) {
    return fetch(this._url+link, {method: newMethod , headers: this._headers, body: JSON.stringify(newBody)})
    .then(res => this._checkResult(res))
  }

  _checkResult(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
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

  deleteCard(id) {
    return this._useFetch(`/cards/${id}`, 'DELETE')
  }

  setLike(id) {
    return this._useFetch(`/cards/${id}/likes`, 'PUT')
  }

  removeLike(id) {
    return this._useFetch(`/cards/${id}/likes`, 'DELETE')
  }

  setAvatar(data) {
    return this._useFetch(`/users/me/avatar`, 'PATCH', data)
  }
}
