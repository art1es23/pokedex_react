export default class ServicePokedex {
    constructor() {
        this._url = 'https://pokeapi.co/api/v2/pokemon/';
    }

    getResources = async () => {
        const res = await fetch(this._url);
        return await res.json();
    }

    getChar = async (id, url) => {
        const res = await fetch(`${this._url}${id}`);
        return await res.json();
    }

}