export default class UserInfo{
    constructor(nameSelector, statusSelector){
        this._name = document.querySelector(nameSelector).textContent;
        this._status = document.querySelector(statusSelector).textContent;
    }

    getUserInfo(){
        this._userInfo = {
            name: this._name,
            status: this._status
        }
        return this._userInfo
    }

    setUserInfo(profileData){
        this._profileData = profileData;
        this._name = this._profileData.name;
        this._status = this._profileData.status;
    } 
}