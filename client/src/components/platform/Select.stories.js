import React from 'react';
import { storiesOf } from '@storybook/react';
import { State, Store } from '@sambego/storybook-state';
import { ThemeProvider } from 'styled-components';
import Themes from '../../utils/ThemeUtil'; 
import Select from './Select';

const store = new Store({
    selectOneVal: '',
    selectTwoVal: '',
    selectThreeVal: ''
});

const stories = storiesOf('Components', module);

stories.add('Select', () => {

    const onChange = (id, e) => {
        store.set({
            id : e.target.value
        });
    };

    return (
        <ThemeProvider theme={Themes.main}>
            <State store={store}>
                <Select value={store.selectOneVal} onChange={onChange.bind(null, 'selectOneVal')}>
                    <option value="">Select</option>
                    <option value="One">One</option>
                    <option value="Two">Two</option>
                    <option value="Three">Three</option>
                </Select>
    
                <Select value={store.selectTwoVal} onChange={onChange.bind(null, 'selectTwoVal')} label="With Label">
                    <option value="">Select</option>
                    <option value="One">One</option>
                    <option value="Two">Two</option>
                    <option value="Three">Three</option>
                </Select>
    
                <Select value={store.selectThreeVal} onChange={onChange.bind(null, 'selectThreeVal')} label="With Inline Label" inline>
                    <option value="">Select</option>
                    <option value="One">One</option>
                    <option value="Two">Two</option>
                    <option value="Three">Three</option>
                </Select>
            </State>
        </ThemeProvider>
    );

});