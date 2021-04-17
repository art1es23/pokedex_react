import React, { Component } from 'react';
import CharTypesItem from '../char-types-item';

import './char-types.css';

class CharTypes extends Component {


    // renderItems = (arr) => {

    //     return arr.map(item => {

    //         const {id} = item;
    //         const label = this.props.renderItem(item);
    //         return (
    //             <li 
    //                 key={id}
    //                 className="char-types__item"
    //                 // onClick={() => this.props.onItemSelected(id)}
    //                 >
    //                 {label}
    //             </li>
    //         )
    //     })
    // }

    
    render () {

        // const {data} = this.props;
        // const items = this.renderItems(data);

        return (
            <ul className="char-types">
                {/* {items} */}
                <CharTypesItem/>
                <CharTypesItem/>
            </ul>
        )
    }
}

export default CharTypes;