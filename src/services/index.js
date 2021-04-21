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
        // console.log(char);
        return await res.json();
    }

    // // isSet(data) {
    // //     if (data) {
    // //         return data;
    // //     } else {
    // //         return 'no data!';
    // //     }
    // // }

    // _transformChar = (char) => {
    //     return {
    //         id: char.id,
    //         name: char.name,
    //         types: char.types
    //         // img: this.isSet(char.sprites),
    //         // types: this.isSet(char.types)
    //     }
    // }

}