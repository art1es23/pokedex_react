import React, { Component } from 'react';
import styled from 'styled-components';

import ServicePokedex from '../../services';

const CharDescriptionWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
`;

const CharDescription = styled.div`
    position: sticky;
    top: 50%;
    transform: translate(25%, -50%);
    height: 60vh;
    display: flex;
    flex-direction: column;
    width: 60%;
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

// const TypeListItem = styled.li`
//     display: inline-block;
//     text-align: center;
//     // border: 1px solid orangered;
//     margin: 0.25rem;
//     padding: 0.25rem 0.75rem;
//     border-radius: 4px;
//     transition: all 0.3s ease-in-out;

//     &:hover {
//         cursor: pointer;
//         color: white;
//     }

//     // background-color: ${props => props.bg}
// `;

// const Table = styled.table`

// `;
export default class CharCardDescription extends Component {

    ServicePokedex = new ServicePokedex();
    
    constructor (props) {
        super(props);

        this.state = {
            char: {},
            error: false,
            imgURL: '',
            // nameNew: ''
        }
    }

    componentDidMount () {
        this.updateItem();
    }

    componentDidUpdate (prevProps) {
        if (this.props.charId !== prevProps.charId) {
            this.updateItem();
        }
    }

    onCharDetailsLoaded = (char) => {
        this.setState({
            char
        });
    }

    updateItem () {
        const {charId, getData} = this.props;
        // if (!charId) return;
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
            char: [],
            imgURL: '',
            error: true
        });
    }

    renderItems = (arr) => {
        return arr.map((item) => {
            const {slot, type} = item;  
            const {name} = type;          

            return (
                <span
                    key={slot}>
                        {name}
                </span>
            )
        })
    }
    

    render () {

        const {char, imgURL} = this.state;
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
                            <td>Value</td>
                        </tr>
                        <tr>
                            <th>Total moves</th>
                            <td>Value</td>
                        </tr>

                        </tbody>                        
                    </table>
                </CharDescription>   
            </CharDescriptionWrapper>
        )
    }
}