import React, { Component } from 'react';
import styled from 'styled-components';

import ServicePokedex from '../../services';

import spinner from '../spinner/Spinner-5.gif';

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

const CharDescriptionWrapper = styled.div`
    // display: flex;
    display: ${active => active === true ? 'flex' : 'none'};
    width: 100%;
    top: 0;
    left: 0;
    height: 100vh;
    justify-content: center;
    align-items: center;
    position: fixed;
    background-color: white;
    box-shadow: inset 0 0 15px 5px rgba(0,0,0,0.35);

    @media only screen and (min-width: 1024px) {
        position: sticky;
        display: flex;
        box-shadow: none;
    }
`;

const CharDescription = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;
    align-items: center;
    padding: 2.5rem 5rem;
    transition: box-shadow 0.3s ease-in-out;

    @media only screen and (min-width: 1024px) {
        box-shadow: inset 0 0 15px 5px rgba(0,0,0,0.35);
        width: 80%;
        padding: 2.5rem;
        &:hover {
            box-shadow: inset 0 0 10px 1px rgba(100,0,0,0.75);
        }
    }
    @media only screen and (min-width: 1600px) {
        width: 65%;
    }
`;

const CloseBtn = styled.div`
    position: absolute;
    top: 7.5%;
    right: 2.5%;
    font-size: 2.5rem;
    line-height: 3rem;
    color: black;
    display: block;
    padding: 0.75rem 1rem;
    transform: translate(-50%, -50%);
    font-weight: 700;

    @media only screen and (min-width: 1024px) {
        display: none;
    }
`;

const CharDescriptionTable = styled.table`
    border-collapse: collapse;
`;

const ImgWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const Sprite = styled.img`
    width: 50%;
    height: 100%;
    object-fit: cover;
`;

const CardTitle = styled.h3`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 1rem 0;
    text-align: center;
    font-size: 1.25rem;
    font-weight: 600;
`;


const TypeListItem = styled.span`
    display: inline-block;
    text-align: center;
    margin: 0.25rem;
    padding: 0.35rem;
    border-radius: 4px;
    color: white;
    background-color: ${props => props.bg};  
`;


export default class CharCardDescription extends Component {

    ServicePokedex = new ServicePokedex();
    
    constructor (props) {
        super(props);

        this.state = {
            char: null,
            error: false,
            imgURL: ''
        }
    }

    onCharDetailsLoaded = (char) => {
        this.setState({
            char
        });
    }    

    componentDidMount () {
        const {charId, getData} = this.props;

        getData(charId)
        .then(this.onCharDetailsLoaded)
        .catch(() => this.onError());

        this.updateItem();
    }

    componentDidUpdate (prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateItem();
        }
    }

    updateItem () {
        const {charId, getData} = this.props;
        if (!charId) return;
        const imgURL = `https://pokeres.bastionbot.org/images/pokemon/${charId}.png`;
        
        this.setState({
            imgURL
        });
        
        getData(charId)
            .then(this.onCharDetailsLoaded)
            .catch(() => this.onError());
    }

    onError () {
        this.setState({
            char: null,
            imgURL: '',
            error: true
        });
    }

    renderItems = (arr) => {
        return arr.map(item => {
            const {slot, type} = item;  
            const {name} = type;          

            if (!Object.keys(COLORS).includes(name)) return false;
            let bgColor = COLORS[name];
            const nameNew = name[0].toUpperCase() + name.slice(1);

            return (
                <TypeListItem
                    key={slot}
                    bg={bgColor}>
                        {nameNew}
                </TypeListItem>
            )
        })
    }

    renderStatsList = (arr) => {
        return arr.map((item, index) => {

            const {stat: {name}, base_stat} = item;
            const nameNew = name[0].toUpperCase() + name.slice(1);

            return (
                <tr key={index}>
                    <th>{nameNew}</th>
                    <td>{base_stat}</td>
                </tr>
            )
        })
    }
    
    changeActive = (act) => !act;

    render () {

        const {char, imgURL} = this.state;
        const {active} = this.props;

        if (char === null) return (<div><img src={spinner} alt=""/></div>)
        
        const {name, types, moves, weight, stats} = char;
        const itemList = this.renderItems(types);
        const statsList = this.renderStatsList(stats);

        const nameNew = name[0].toUpperCase() + name.slice(1);

        return (
            <CharDescriptionWrapper
                active={active}
            >
                <CloseBtn onClick={() => this.changeActive(active)}>X</CloseBtn>
                <CharDescription>
                    <ImgWrapper>
                        <Sprite src={imgURL} alt=""/>
                    </ImgWrapper>
                    <CardTitle>{nameNew}</CardTitle>
                    <CharDescriptionTable border='1'>
                        <tbody>
                        <tr>
                            <th>Type</th>
                            <td>{itemList}</td>
                        </tr>
                        {statsList}
                        <tr>
                            <th>Weight</th>
                            <td>{weight}</td>
                        </tr>
                        <tr>
                            <th>Total moves</th>
                            <td>{moves.length}</td>
                        </tr>

                        </tbody>                        
                    </CharDescriptionTable>
                </CharDescription>   
            </CharDescriptionWrapper>
        )
    }
}