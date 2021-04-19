import React, { Component } from 'react';
import CharListItem from '../char-list-item';
// import axios from 'axios';
import styled from 'styled-components';

// import getResources from '../../services';

const CardBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    grid-gap: 1.5rem;
    justify-content: center;
    align-items: center;
`;

export default class CharList extends Component {

    state = {
        url: 'https://pokeapi.co/api/v2/pokemon/',
        chars: null,
        error: null,
        isLoaded: false,
        selectedChar: 1
    }

    componentDidMount () {
        fetch(this.state.url)
        .then(res => res.json())
        .then(
            (item) => {
                this.setState({
                    isLoaded: true,
                    chars: item.results
                })
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                })
            }
        )
    }
    
    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    render () {
        const {error, isLoaded, chars} = this.state;

        if (error) {
            return <p>Error {error.message}</p>
        } else if (!isLoaded) {
            return <h1>Loading...</h1>
        } else {
            const cardItems = chars.map(item => 
            (
                <CharListItem
                    key={item.name}
                    name={item.name}
                    url={item.url}
                    onCharSelected={this.onCharSelected}/>
            ));

            return (
                <CardBox className="char-list">
                    {cardItems}
                </CardBox>
            )
        }
    }

}
    