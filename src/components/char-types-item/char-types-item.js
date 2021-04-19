import React, { Component } from 'react';
// import './char-types-item.css';

import styled from 'styled-components';

const TypeListItem = styled.li`
    display: inline-block;
    text-align: center;
    border: 1px solid orangered;
    margin: 0.25rem;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
`;
class CharTypesItem extends Component {
    
    render () {

        const {name} = this.props;
        console.log(name);
        return (
            <TypeListItem>{name}</TypeListItem>
        )
    }
}

export default CharTypesItem;