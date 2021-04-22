import React, { Component } from 'react';
import CharTypes from '../char-types';
import styled from 'styled-components';

import spinner from '../spinner/Spinner-5.gif';


const Card = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;

    border-radius: 4px;
    box-shadow: 10px 10px 15px 2.5px rgba(0,0,0,0.25);
    transition: all 0.3s ease-in-out;

    &:hover {
        box-shadow: 0 0 10px 1px rgba(100, 0, 0.25);
        // background-color: rgba(100, 0, 0, 0.2);
        cursor: pointer;
    }
`;

const ImgWrapper = styled.div`
    display: flex;
    width: 80%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    position: relative;

    &:before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: block;
        width: 100%
        height: 100%;

        background-color: black;
        border-radius: 50%;
    }
`;

const Sprite = styled.img`
    width: 90%;
    height: 100%;
    object-fit: contain;
`;

const CardTitle = styled.h3`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin-top: 1rem;

    text-align: center;
    font-size: 1.25rem;
    font-weight: 400;
`;

export default class CharListItem extends Component{

    constructor (props) {
        super(props);

        this.state = {
            nameNew: '',
            imgURL: '',
            charId: '',
            imgLoading: true,
            manyRequests: false,
            charTypes: []
        }
    }

    componentDidMount () {
        const {name, url} = this.props;

        const charId = url.split('/')[url.split('/').length - 2];
        const imgURL = `https://pokeres.bastionbot.org/images/pokemon/${charId}.png`;
        const nameNew = name[0].toUpperCase() + name.slice(1);

        fetch(url)
        .then(res => res.json())
        .then(
            (item) => {
                this.setState({
                    nameNew,
                    charId,
                    imgLoading: true,
                    manyRequests: false,
                    imgURL,        
                    charTypes: item.types
                })
            }
        )
    }

    render () {

        const {nameNew, imgURL, imgLoading, manyRequests, charTypes, charId} = this.state;

        return (
            <Card 
                onClick={() => this.props.onCharSelected(charId)}
                >
                <ImgWrapper>
                    {
                        imgLoading ? (
                            <img
                                src={spinner}
                                style={{width: '5rem', height: '5rem'}}
                                className='spinner'
                                alt='Loading'/>
                        ) : null
                    }

                    <Sprite
                        className='char-img'
                        src={imgURL}
                        alt='Hero image'
                        onLoad={() => this.setState({imgLoading: false})}
                        onError={() => this.setState({manyRequests: true})}
                        style={
                            manyRequests
                                ? {display: 'none'}
                                : imgLoading
                                ? null
                                : {display: 'block'}
                        }
                        />
                    {manyRequests ? (
                        <h4>To many requests</h4>
                    ) : null}
                </ImgWrapper>
                <CardTitle className='char__title'>{nameNew}</CardTitle>
                <CharTypes 
                    types={charTypes}
                    filterCards={this.props.filterCards}
                />                
            </Card>            
        )
    }
}
