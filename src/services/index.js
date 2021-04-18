export default class ServicePokedex {
    constructor() {
        this._apiBase = 'https://pokeapi.co/api/v2/pokemon/';
    }

    getResources = async () => {
        const res = await fetch(`${this._apiBase}`);

        // if (!res.ok) {
        //     throw new Error(`Could not fetch ${id}, status: ${res.status}`);
        // }

        // const char = await res.json();

        // const list = char.results;

        // console.log('list: ', list);
        // return list;
        return await res.json();
    }

    // getAllChars = async () => {
    //     const res = await this.getResource(`/pokemon/`);
    //     console.log(res);
    //     return res;
    // }

    // getChar = async (id) => {
    //     const char = await this.getResource(`/pokemon/${id}`)
    //     return this._transformChar(char);
    // }

    // // isSet(data) {
    // //     if (data) {
    // //         return data;
    // //     } else {
    // //         return 'no data!';
    // //     }
    // // }

    // _transformChar = (char) => {
    //     return {
    //         // id: this._extractId(char),
    //         name: char.name,
    //         // img: this.isSet(char.sprites),
    //         // types: this.isSet(char.types)
    //     }
    // }

}