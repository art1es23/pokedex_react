import React, { Component } from 'react';
import styled from 'styled-components';

import ServicePokedex from '../../services';

import spinner from '../spinner/Spinner-5.gif';

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

export default class CharCardDescription extends Component {

    ServicePokedex = new ServicePokedex();
    
    constructor (props) {
        super(props);

        this.state = {
            char: [],
            loading: true,
            // types: []
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
            char,
            loading: false
        });
    }


    updateItem () {
        const {charId, getData} = this.props;
        if (!charId) return;

        this.setState({
            loading: true
        });

        // console.log(charId);

        getData(charId)
        .then(this.onCharDetailsLoaded)
        .catch()

    }

    // renderItems = (arr) => {
    //     return arr.map((item, index) => {

    //         const {name} = item.type;            

    //         // if (!Object.keys(COLORS).includes(name)) return false;
    //         // let bgColor = COLORS[name];

    //         return (
    //             <span
    //                 // bg={bgColor}
    //                 key={index}>
    //                     {name}
    //             </span>
    //         )
    //     })
    // }


    render () {
        const {char} = this.state;
        const {name, types, weight} = char;

        // attack, defence, hp, sp attack, sp defence, speed, weight, total moves 

        // console.log('type ', types);
        // const typeItems = this.renderItems(types);

        return (
            <CharDescriptionWrapper>
                <CharDescription>
                    <img src={spinner} alt=""/>
                    <h3>{name}</h3>
                    <table>
                        {/* <tr>
                            <th><span>Type</span></th>
                            <td>
                                {typeItems}
                            </td>
                        </tr> */}
                        {/* <tr>
                            <th>Title</th>
                            <td>Text</td>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <td>Text</td>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <td>Text</td>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <td>Text</td>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <td>Text</td>
                        </tr>
                        <tr>
                            <th>Title</th>
                            <td>Text</td>
                        </tr> */}
                    </table>
                </CharDescription>   
            </CharDescriptionWrapper>
        )
    }
}