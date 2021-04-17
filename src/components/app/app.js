import React, { Component } from 'react';
import CharContainer from '../char-container';
import ErrorMessage from '../error-message';
import ServicePokedex from '../../services';

import './app.css';

class App extends Component {

    ServicePokedex = new ServicePokedex();

    state = {
        error: false
    }

    render () {

        if (this.state.error) {
            return <ErrorMessage/>
        }

        return (
            <main className='main'>
                <h1 className='main__title'>Pokedex</h1>
                <CharContainer/>
                <section></section>
            </main>
        )
    }
}

export default App;