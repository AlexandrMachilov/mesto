
export default class Section {
    constructor({items, renderer}, containerSelector) {
        this._renderedItems = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(item, isAppend = false) {
        if (isAppend) {
            this._container.append(item);    
        } else {
            this._container.prepend(item);
        }
    }
}