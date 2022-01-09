export default class UserInfo{
    constructor(nameSelector, statusSelector, avatarSelector){
        this._name = document.querySelector(nameSelector);
        this._status = document.querySelector(statusSelector);
        this._avatar = document.querySelector(avatarSelector);
    }

    getUserInfo(){
        this._userInfo = {
            name: this._name.textContent,
            status: this._status.textContent
        }
        return this._userInfo
    }

    setUserInfo(profileData){
        this._profileData = profileData;
        this._name.textContent = this._profileData.name;
        this._status.textContent = this._profileData.about;
        //
    } 

    getUserId(data){
        return this._userId = {
            id: data._id
        }
    }

    setUserAvatar(data){
        this._avatar.src = data.avatar;
    }
}