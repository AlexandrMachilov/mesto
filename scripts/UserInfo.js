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

    setUserInfo(nameInput, statusInput){
        this._nameInput = document.querySelector(nameInput);
        this._statusInput = document.querySelector(statusInput);
        
        this._name.textContent = this._nameInput.value;
        this._status.textContent = this._statusInput.value;
        
        } 
    
}