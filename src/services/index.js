import axios from 'axios';

// export default class ServicePokedex {
//     constructor() {
//         this._apiBase = 'https://pokeapi.co/api/v2/pokemon/';
//     }

const getResources = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon/';
    const res = await axios.get(url);
    // console.log('asdaw', res);
    return res.data['results'];
}

export default getResources;

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

// }