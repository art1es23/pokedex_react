import React, { Component } from 'react';
import styled from  'styled-components';

const COLORS = {
    fire: '#FF5300',
    grass: '#00AA00',
    electric: '#5ED1BA',
    water: '#1240AB',
    ground: '#A64B00',
    rock: '#6A8D8D',
    fairy: '#6AFF00',
    poison: '#00FF00',
    bug: '#BC00FF',
    dragon: '#FFE340',
    physic: '#FF40FF',
    flying: '#69C9BC',
    fighting: '#A60004',
    normal: '#BBBBBB'
};

const TypeList = styled.ul`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: center;
    margin: 1rem 0;
    list-style: none;
`;

const TypeListItem = styled.li`
    display: inline-block;
    text-align: center;
    // border: 1px solid orangered;
    margin: 0.25rem;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    transition: all 0.3s ease-in-out;

    &:hover {
        cursor: pointer;
        color: white;
    }

    background-color: ${props => props.bg}
`;

class CharTypes extends Component {

    renderItems = (arr) => {
        return arr.map((item) => {

            const {slot, type} = item;
            const {name} = type;            

            if (!Object.keys(COLORS).includes(name)) return false;
            let bgColor = COLORS[name];
            const nameNew = name[0].toUpperCase() + name.slice(1);

            return (
                <TypeListItem
                    bg={bgColor}
                    key={slot}
                    onClick={() => {this.props.filterCards(name)}}
                    >
                        {nameNew}
                </TypeListItem>
            )
        })
    }
    
    render () {
        const {types} = this.props;
        const listItems = this.renderItems(types);

        return (
            <TypeList>
                {listItems}
            </TypeList>
        )
    }
}

export default CharTypes;