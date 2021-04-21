import React, { Component } from 'react';
import styled from 'styled-components';

import ServicePokedex from '../../services';

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
    normal: '#FFFFFF'
};

const CharDescriptionWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const CharDescription = styled.div`
    position: sticky;
    top: 50%;
    transform: translate(0%, -50%);
    height: 60vh;
    display: flex;
    flex-direction: column;
    width: 45%;
    justify-content: center;
    align-items: center;
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
        return arr.map((item) => {
            const {slot, type} = item;  
            const {name} = type;          

            if (!Object.keys(COLORS).includes(name)) return false;
            let bgColor = COLORS[name];

            return (
                <TypeListItem
                    key={slot}
                    bg={bgColor}>
                        {name}
                </TypeListItem>
            )
        })
    }
    

    render () {

        const {char, imgURL} = this.state;

        if (char === null) return (<div>SPINNER</div>)
        
        const {name, types, moves, weight} = char;

        console.log(char);
        console.log('Name:', name);
        console.log('Types:', types);
        console.log('Moves:', moves);
        console.log('Weight:', weight);

        const itemList = this.renderItems(types);

        // attack, defence, hp, sp attack, sp defence, speed, weight, total moves 
        return (
            <CharDescriptionWrapper>
                <CharDescription>
                    <ImgWrapper>
                        <Sprite src={imgURL} alt=""/>
                    </ImgWrapper>
                    <CardTitle>{name}</CardTitle>
                    <table border='1' width='100%'>
                        <tbody>
                        <tr>
                            <th>Type</th>
                            <td>{itemList}</td>
                        </tr>
                        <tr>
                            <th>Attack</th>
                            <td>Value</td>
                        </tr>
                        <tr>
                            <th>Defence</th>
                            <td>Value</td>
                        </tr>
                        <tr>
                            <th>HP</th>
                            <td>Value</td>
                        </tr>
                        <tr>
                            <th>SP Attack</th>
                            <td>Value</td>
                        </tr>
                        <tr>
                            <th>SP Defence</th>
                            <td>Value</td>
                        </tr>
                        <tr>
                            <th>Speed</th>
                            <td>Value</td>
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>{weight}</td>
                        </tr>
                        <tr>
                            <th>Total moves</th>
                            <td>{moves.length}</td>
                        </tr>

                        </tbody>                        
                    </table>
                </CharDescription>   
            </CharDescriptionWrapper>
        )
    }
}