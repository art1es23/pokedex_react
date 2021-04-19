import React, { Component } from 'react';
import CharContainer from '../char-container';
import ErrorMessage from '../error-message';
import styled from 'styled-components';

const MainApp = styled.main`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 80%;
    margin: 0 auto;
`;

const MainTitle = styled.h1`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0;
    padding: 1.5rem 0;

    text-align: center;
    font-size: 3rem;
    line-height: 3.25rem;
    letter-spacing: 2.5px;
`;

class App extends Component {

    state = {
        error: false
    }

    render () {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <MainApp className='main'>
                <MainTitle>Pokedex</MainTitle>
                <CharContainer/>
            </MainApp>
        )
    }
}

export default App;