export default class UserInfo{
    constructor(nameSelector, statusSelector){
        this._name = document.querySelector(nameSelector);
        this._status = document.querySelector(statusSelector);
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
        this._status.textContent = this._profileData.status;
    } 
}