import React, { Component } from 'react';
import CharListItem from '../char-list-item';
import CharCardDescription from '../char-description';
import styled from 'styled-components';

import ServicePokedex from '../../services';

const CardContainer = styled.section`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2.5rem;
    position: relative;
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
    grid-column: 1/4;
    padding: 1rem;
    margin-bottom: 5rem;
    box-shadow: 5px 5px 10px 1px rgba(0,0,0,0.35);
    border: none;
    background-color: transparent;
    transition: all 0.3s ease-in-out;

    font-size: 1.75rem;

    &:hover {
        cursor: pointer;
        color: rgba(255,50,50,1);
        box-shadow: 0 0 10px 1px rgba(255,50,50,0.75);
    }
`;

export default class CharContainer extends Component {

    ServicePokedex = new ServicePokedex();

    constructor (props) {
        super(props);

        this.state = {
            chars: null,
            error: null,
            isLoaded: false,
            selectedChar: 1,
            countVisibleItems: 12
        }
    }

    componentDidMount () {

        this.ServicePokedex.getResources()
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
        // console.log(id);
        this.setState({
            selectedChar: id
        })
    }

    onChangeCountVisibleItems = () => {
        let {countVisibleItems} =this.state;
        countVisibleItems += countVisibleItems;
        
        this.setState({
            countVisibleItems
        })

    }
    
    render () {
        const {error, isLoaded, chars, selectedChar, countVisibleItems} = this.state;

        // console.log(selectedChar);

        const charList = () => {
            if (error) {
                return <p>Error {error.message}</p>
            } else if (!isLoaded) {
                return <h1>Loading...</h1>
            } else {
                const cardItems = chars.slice(0, countVisibleItems).map((item, index) => 
                (
                    <CharListItem
                        key={index}
                        name={item.name}
                        url={item.url}
                        charId={selectedChar}
                        onCharSelected={this.onCharSelected}
                        />
                ));
    
                return (
                    <CardBox 
                        // charId={this.onCharSelected}
                        getData={this.ServicePokedex.getResources}
                        >
                        {cardItems}

                        <LoadMoreBtn
                            onClick={this.onChangeCountVisibleItems}
                        >Load more</LoadMoreBtn>
                    </CardBox>
                )
            }
        }
        // console.log('s', this.state.selectedChar);

        const charDescription = (
            <CharCardDescription
                charId={this.state.selectedChar}
                getData={this.ServicePokedex.getChar}
            />
        )
        
        return (
            <CardContainer className='char-container'>
                {charList()}
                {charDescription}
            </CardContainer>
        )        
    }
}