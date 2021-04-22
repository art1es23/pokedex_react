import React, { Component } from 'react';
import CharContainer from '../char-container';
import ErrorMessage from '../error-message';
import styled from 'styled-components';

const MainApp = styled.main`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    width: 94%;
    margin: 0 auto;
    @media only screen and (min-width: 1366px) {
        width: 80%
    }
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
    
    @media only screen and (min-width: 1024px) {
        grid-column: 1/3;
    }
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