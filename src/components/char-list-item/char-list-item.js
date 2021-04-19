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
    padding: 1.5rem;

    border-radius: 4px;
    box-shadow: 10px 10px 15px 2.5px rgba(0,0,0,0.25);
    transition: all 0.3s ease-in-out;

    &:hover {
        background-color: rgba(100, 0, 0, 0.2);
        cursor: pointer;
    }
`;

const ImgWrapper = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

const Sprite = styled.img`
    width: 60%;
    object-fit: cover;
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
            charID: '',
            imgLoading: true,
            manyRequests: false,
            charTypes: []
        }
    
    }

    componentDidMount () {
        const {name, url} = this.props;

        const charID = url.split('/')[url.split('/').length - 2];
        const imgURL = `https://pokeres.bastionbot.org/images/pokemon/${charID}.png`;
        const nameNew = name[0].toUpperCase() + name.slice(1);

        fetch(url)
        .then(res => res.json())
        .then(
            (item) => {
                this.setState({
                    nameNew,
                    charID,
                    imgLoading: true,
                    manyRequests: false,
                    imgURL,        
                    charTypes: item.types
                })
            }
        )
    }

    onCharSelected = (id) => {
        this.setState({
            charID: id
        })
    }

    render () {

        const {nameNew, imgURL, imgLoading, manyRequests, charTypes, charID} = this.state;

        return (
            <Card 
                onClick={() => this.onCharSelected(charID)}
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
                />                
            </Card>            
        )
    }
}
