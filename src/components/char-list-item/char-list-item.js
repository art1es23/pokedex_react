import React, { Component } from 'react';
import CharTypes from '../char-types';
import ServicePokedex from '../../services';

import './char-list-item.css';

class CharListItem extends Component{

    ServicePokedex = new ServicePokedex();

    render () {

        const {label} = this.props;

        // const charTypes = (
        //     <CharTypes
        //         getData={this.SerrvicePokedex.getResources}/>
        // )

        return (
            <div className="char-list__item">
                <div className='img--wrapper char__img'>
                    <img src="https://pokeres.bastionbot.org/images/pokemon/1.png" alt=""/>
                </div>
                <h3 className='char__title'>{label}</h3>
                <CharTypes/>

            </div>            
        )
    
    }
}

export default CharListItem