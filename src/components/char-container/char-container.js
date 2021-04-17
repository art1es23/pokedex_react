import React, { Component } from 'react';
import CharList from '../char-list';

import ServicePokedex from '../../services';
import ErrorMessage from '../error-message';

import './char-container.css';

export default class CharContainer extends Component {
    
    ServicePokedex = new ServicePokedex();

    state = {
        selectedChars: 30,
        error: false
    }

    onItemSelected = (id) => {
        this.setState({
            selectedChars: id
        })
    }

    componentDidCatch () {
        this.setState({
            error: true
        });
    }

    render () {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        // console.log(this.ServicePokedex.getAllChars);

        const charList = (
            <CharList
                onItemSelected={this.onItemSelected}
                getData={this.ServicePokedex.getResources}
                renderItem={({name}) => `${name}`}/>
        )

        return (
            <section className='char-container'>
                {charList}
                <button className='load-more'>Load more</button>
            </section>
        )        
    }
}