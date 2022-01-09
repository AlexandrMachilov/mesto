export default class Api{
    constructor({adress, cohortID, token}){
        this.adress = adress,
        this.cohortID = cohortID,
        this.token = token
    }

    _getResponseData(res){
        if (!res.ok){
            return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
    }
    
    getProfileInfo() {
        return fetch(`${this.adress}/v1/${this.cohortID}/users/me`, {
            headers: {
              authorization: this.token
            }
          })
            .then(res => this._getResponseData(res))
    }

    getInitialCards() {
        return fetch(`${this.adress}/v1/${this.cohortID}/cards`, {
            headers: {
              authorization: this.token
            }
          })
            .then(res => this._getResponseData(res))
    }

    editProfileData(data){
        return fetch(`${this.adress}/v1/${this.cohortID}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                about: data.about
            })
        })
        .then(res => this._getResponseData(res))
    }

    createCard(data){
        return fetch(`${this.adress}/v1/${this.cohortID}/cards`, {
            method: 'POST',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: data.name,
                link: data.link
            })
        })
        .then(res => this._getResponseData(res))
    }

    deleteCard(data){
        return fetch(`${this.adress}/v1/${this.cohortID}/cards/${data._id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token
            }
        })
        .then(res => this._getResponseData(res))
    }

    likeCard(data){
        return fetch(`${this.adress}/v1/${this.cohortID}/cards/${data._id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this.token
            }
        })
        .then(res => this._getResponseData(res))
    }

    deleteLike(data){
        return fetch(`${this.adress}/v1/${this.cohortID}/cards/${data._id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this.token
            }
        })
        .then(res => this._getResponseData(res))
    }

    editAvatar(data){
        return fetch(`${this.adress}/v1/${this.cohortID}/users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: data.avatar,
            })
        })
        .then(res => this._getResponseData(res))
    }
}