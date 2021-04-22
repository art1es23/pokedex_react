import React, { Component } from 'react';
import CharListItem from '../char-list-item';
import CharCardDescription from '../char-description';
import styled from 'styled-components';

import ServicePokedex from '../../services';

const CardContainer = styled.section`
    display: grid;
    width: 100%;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: 1rem;
    position: relative;
    
    @media only screen and (min-width: 1024px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const CardBox = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    width: 100%;
    grid-gap: 1.5rem;
    justify-content: center;
    // align-items: center;

    @media only screen and (min-width: 600px) {
        grid-template-columns: repeat(3, 1fr);
    }
    @media only screen and (min-width: 768px) {
        grid-template-columns: repeat(4, 1fr);
    }
    @media only screen and (min-width: 1024px) {
        grid-template-columns: repeat(3, 1fr);
    }
`;

const LoadMoreBtn = styled.button`
    grid-column: 1/3;
    padding: 1rem;
    margin-bottom: 5rem;
    box-shadow: 5px 5px 10px 1px rgba(0,0,0,0.35);
    border: none;
    background-color: transparent;
    transition: all 0.3s ease-in-out;
    font-size: 1.75rem;

    &:hover {
        cursor: pointer;
        color: rgba(100,0,0,1);
        box-shadow: 0 0 10px 1px rgba(100,0,0,0.75);
    }

    @media only screen and (min-width: 600px) {
        grid-column: 1/4;
    }
    @media only screen and (min-width: 768px) {
        grid-column: 1/5;
        margin: 2.5rem 0 5rem;
    }
    @media only screen and (min-width: 1024px) {
        grid-column: 1/4;
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
            countVisibleItems: 12,
            active: false,
            filterType: ''
        }
    }

    initCards = () => {
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

    componentDidMount () {
        this.initCards();
    }

    // componentDidUpdate (prevState) {
    //     if (prevState.chars !== this.state.chars ) {
    //         // this.initCards();
    //         // this.filterCards(this.state.filterType);
    //         this.onChangeCountVisibleItems()
    //     }
    // }

    onCharSelected = (id) => {
        document.querySelector('.modal').classList.add('modal--open');
        this.setState({
            selectedChar: id,
            active: true
        })

    }

    onChangeCountVisibleItems = () => {
        let {countVisibleItems} = this.state;
        countVisibleItems = countVisibleItems + 12;
        
        this.setState({
            countVisibleItems
        })
    }

    filterCards = (type) => {
        // this.initCards();
        let {chars} = this.state;
        let newArr = [];

        chars.map(item => {
            this.ServicePokedex.getFilterChar(item.url)
            .then(
                (res) => {
                    const {types} = res;
                    const filter = types.map(el => el.type.name === type);    

                    const filterData = filter.some(el => el === true);
                    if (!filterData) return false;

                    newArr.push(item);
                }
            )
            return newArr;
        })   
        
        this.onChangeCountVisibleItems();
        this.setState({
            chars: newArr,
            filterType: type
        })     
    }
    
    render () {
        const {error, isLoaded, chars, selectedChar, countVisibleItems, active} = this.state;

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
                        filterCards={this.filterCards}
                        />
                ));
    
                return (
                    <CardBox 
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

        const charDescription = (
            <CharCardDescription
                charId={this.state.selectedChar}
                getData={this.ServicePokedex.getChar}
                active={active}
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