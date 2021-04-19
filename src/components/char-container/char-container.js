import React, { Component } from 'react';
import CharListItem from '../char-list-item';
import styled from 'styled-components';

const CardContainer = styled.section`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2.5rem

`;

const CardBox = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
    grid-gap: 1.5rem;
    justify-content: center;
    align-items: center;
`;

const LoadMoreBtn = styled.button`
    grid-column: 1/2;

`;

export default class CharContainer extends Component {

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
        console.log('sadas');
        this.setState({
            selectedChar: id
        })
    }

    render () {
        const {error, isLoaded, chars} = this.state;

        const charList = () => {
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
        
        return (
            <CardContainer className='char-container'>
                {charList()}
                <section></section>
                <LoadMoreBtn>Load more</LoadMoreBtn>
            </CardContainer>
        )        
    }
}