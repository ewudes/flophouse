class Store {
  constructor(authKey, storage) {
    this._storage = storage;
    this._storeAuthKey = authKey;
  }

  getItems() {
    try {
      return JSON.parse(this._storage.getItem(this._storeAuthKey)) || {};
    } catch (err) {
      return {};
    }
  }

  setItem(key, value) {
    const store = this.getItems();

    this._storage.setItem(
        this._storeAuthKey,
        JSON.stringify(
            Object.assign({}, store, {
              [key]: value
            })
        )
    );
  }

  removeItem(key) {
    const store = this.getItems();

    delete store[key];

    this._storage.setItem(
        this._storeAuthKey,
        JSON.stringify(store)
    );
  }

}

export default Store;
