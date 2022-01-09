export default class Api{
    constructor({adress, cohortID, token}){
        this.adress = adress,
        this.cohortID = cohortID,
        this.token = token
    }

    getProfileInfo() {
        return fetch(`${this.adress}/v1/${this.cohortID}/users/me`, {
            headers: {
              authorization: this.token
            }
          })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка при получении дынных профиля ${res.status}`);
                }
            })
    }

    getInitialCards() {
        return fetch(`${this.adress}/v1/${this.cohortID}/cards`, {
            headers: {
              authorization: this.token
            }
          })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    return Promise.reject(`Ошибка при получении данных карточек ${res.status}`);
                }
            })
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
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка при изменении данных профиля ${res.status}`);
            }
        })
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
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка при создании новой карточки ${res.status}`);
            }
        })
    }

    deleteCard(data){
        return fetch(`${this.adress}/v1/${this.cohortID}/cards/${data._id}`, {
            method: 'DELETE',
            headers: {
                authorization: this.token
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка при удалении карточки ${res.status}`);
            }
        })
    }

    likeCard(data){
        return fetch(`${this.adress}/v1/${this.cohortID}/cards/${data._id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: this.token
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка при постановке лайка ${res.status}`);
            }
        })
    }

    deleteLike(data){
        return fetch(`${this.adress}/v1/${this.cohortID}/cards/${data._id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: this.token
            }
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка при снятии лайка ${res.status}`);
            }
        })
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
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject(`Ошибка при изменении аватара профиля ${res.status}`);
            }
        })
    }
}