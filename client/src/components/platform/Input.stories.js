import React from 'react';
import { storiesOf } from '@storybook/react'; 
import { State, Store } from '@sambego/storybook-state';
import { ThemeProvider } from 'styled-components';
import Themes from '../../utils/ThemeUtil';

import Input from './Input';

const store = new Store({
    inputOneVal: '',
    inputTwoVal: '',
    inputThreeVal: ''
});

const stories = storiesOf('Components', module);

stories.add('Input', () => {

    const onChange = (id, e) => {
        store.set({
            id : e.target.value
        });
    };

    return (
        <ThemeProvider theme={Themes.main}>
            <State store={store}>
                <Input value={store.inputOneVal} onChange={onChange.bind(null, 'inputOneVal')} id="myinput" type="text" placeholder="Test"></Input>
        
                <Input value={store.inputTwoVal} onChange={onChange.bind(null, 'inputTwoVal')} id="secondinput" type="text" placeholder="Second Test" label="With Label"></Input>
        
                <Input value={store.inputThreeVal} onChange={onChange.bind(null, 'inputThreeVal')} id="thirdinput" type="text" placeholder="Third Test" label="Inline Label" inline></Input>
            </State>
        </ThemeProvider>
    );
});