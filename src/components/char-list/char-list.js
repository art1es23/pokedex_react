import React, { Component } from 'react';
import CharListItem from '../char-list-item';
// import PropTypes from 'prop-types';

// import ErrorMessage from '../error-message';

// import ServicePokedex from '../../services';

import axios from 'axios';

import './char-list.css';

export default class CharList extends Component {

    // ServicePokedex = new ServicePokedex();
    
    state = {
        url: 'https://pokeapi.co/api/v2/pokemon/',
        char: null
    }

    async componentDidMount () {
        // this.ServicePokedex.getResources()
        // .then( (itemList) => {
        //     this.setState({
        //         itemList
        //     })
        // })

        const res = await axios.get(this.state.url);
        this.setState({char: res.data['results']});
    }

    // renderItems (arr) {
    //     return arr.map((item, i) => {
    //         return (
    //             <div
    //                 key={i}
    //                 className='char-list__item'
    //                 // onClick={() => this.props.onItemSelected(id)}
    //                 >{item.name}</div>
    //         )
    //     })
    // }


    render () {

        // const {itemList} = this.state;
        // const items = this.renderItems(itemList);

        return (
            <div className="char-list">
                {
                    this.state.char ? (
                        this.state.char.map(item => 
                        (
                            <CharListItem
                                key={item.name}
                                name={item.name}
                                url={item.url}/>
                        ))
                ) : (
                    <h1>LOADING...</h1>
                )}
            </div>
        )
    }

}
    
//     renderItems (arr) {
//         console.log(arr);
//         return arr.map(item => {
//             const {id} = item;
//             console.log('id: ',id);
//             // const label = this.props.renderItem(item);
//             // console.log(label);
//             return (
//                 <div
//                     key={id}
//                     className='char-list__item'
//                     // onClick={() => this.props.onItemSelected(id)}
//                     // label={label}
//                     ></div>
//             )
//         });
//     }
    
//     render () {

//         const {data: {results}} = this.props;
//         const items = this.renderItems(results);

//         return (
//             <div className="char-list">
//                 {items}
//             </div>
//         )
//     }
// }

// const WithData = (View) => {
//     return class extends Component {

//         state = {
//             data: null
//         }

//         // static defaultProps = {
//         //     onItemSelected: () => {}
//         // }

//         // static propTypes = {
//         //     onItemSelected: PropTypes.func
//         // }

//         componentDidMount () {
//             const {getData} = this.props;

//             getData()
//                 .then((data) => {
//                     // console.log(data);
//                     this.setState({
//                         data,
//                         error: false
//                     })
//                 })
//                 .catch()
//         }

//         componentDidCatch () {
//             this.setState({
//                 data: null,
//                 error: true
//             })
//         }

//         render () {
//             const {data, error} = this.state;
//             console.log('view: ', data);

//             if (error) {
//                 return <ErrorMessage/>
//             }

//             // if (!data) {
//             //     return <Spinner/>
//             // }

//             return <View {...this.props} data={data}/>
//         }

//     }
// }

// export default WithData(CharList);