class Api {
  private _url: string
  private _headers: any;
  constructor() {
    this._url = 'http://localhost:8005'
    // this._url = 'http://127.0.0.1:46245/api'
    // this._url = 'http://svun.anc.space/api'
    // this._headers = config.headers
    // this._url = 'http://127.0.0.1:8000/api'
  }
  _checkResponse(res: any) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getAllInns(start_text: string) {
    return fetch(this._url + '/search-inns/' + start_text)
      .then(this._checkResponse)
  }

  getRecommends(inn: string, agent: string) {
    return fetch(this._url + '/inn/' + inn + '/' + agent)
      .then(this._checkResponse)
  }

  getAllCategories(start_text: string) {
    return fetch(this._url + '/search-categories/' + start_text)
      .then(this._checkResponse)
  }

  getTopInns(category: string, agent: string, deadline_days: number) {
    category = category.replaceAll(' ', '-')
    console.log(category)
    return fetch(this._url + '/top-inns/' + category + '/' + agent + '/' + deadline_days)
      .then(this._checkResponse)
  }

}
const api = new Api()
export default api