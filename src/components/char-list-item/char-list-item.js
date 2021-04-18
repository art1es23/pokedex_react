import React, { Component } from 'react';
import CharTypes from '../char-types';
// import ServicePokedex from '../../services';

import './char-list-item.css';

export default class CharListItem extends Component{

    // ServicePokedex = new ServicePokedex();

    state = {
        nameNew: '',
        imgURL: '',
        charID: '',
        types: {}
    }

    componentDidMount () {
        const {name, url} = this.props;

        const charID = url.split('/')[url.split('/').length - 2];
        const imgURL = `https://pokeres.bastionbot.org/images/pokemon/${charID}.png`;

        const nameNew = name[0].toUpperCase() + name.slice(1)

        const types = {

        }

        this.setState({
            nameNew,
            charID,
            imgURL
        })

    }


    render () {

        
        // const charTypes = (
        //     <CharTypes
        //         getData={this.SerrvicePokedex.getResources}/>
        // )

        return (
            <div className="char-list__item">
                <div className='img--wrapper char__img'>
                    <img src={this.state.imgURL} alt=""/>
                </div>
                <h3 className='char__title'>{this.state.nameNew}</h3>
                <CharTypes/>

            </div>            
        )
    
    }
}
