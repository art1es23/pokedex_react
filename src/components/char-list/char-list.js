import React, { Component } from 'react';
// import CharListItem from '../char-list-item';
// import PropTypes from 'prop-types';

import ErrorMessage from '../error-message';

// import ServicePokedex from '../../services';

import './char-list.css';

class CharList extends Component {
    
    renderItems (arr) {
        return arr.map(item => {
            const {id} = item;
            const label = this.props.renderItem(item);
            // console.log(label);
            return (
                <li
                    key={id}
                    className='char-list__item'
                    // onClick={() => this.props.onItemSelected(id)}
                    label={label}></li>
            )
        });
    }
    
    render () {

        console.log(this.props);
        const {data: {results}} = this.props;
        // console.log('some: ', results);
        const items = this.renderItems(results);
        // console.log(items);

        return (
            <div className="char-list">
                {items}
            </div>
        )
    }
}

const WithData = (View) => {
    return class extends Component {

        state = {
            data: null,
            error: false
        }

        // static defaultProps = {
        //     onItemSelected: () => {}
        // }

        // static propTypes = {
        //     onItemSelected: PropTypes.func
        // }

        componentDidMount () {
            const {getData} = this.props;
            // console.log(getData);

            getData()
                .then((data) => {
                    this.setState({
                        data,
                        error: false
                    })
                })
                .catch()
        }

        componentDidCatch () {
            this.setState({
                data: null,
                error: true
            })
        }

        render () {
            const {data, error} = this.state;

            if (error) {
                return <ErrorMessage/>
            }

            // if (!data) {
            //     return <Spinner/>
            // }

            return <View {...this.props} data={data}/>
        }

    }
}

export default WithData(CharList);