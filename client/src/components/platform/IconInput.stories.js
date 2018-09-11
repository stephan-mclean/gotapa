import React from 'react';
import { storiesOf } from '@storybook/react'; 
import { State, Store } from '@sambego/storybook-state';
import { withKnobs, boolean } from '@storybook/addon-knobs/react';
import { ThemeProvider } from 'styled-components';
import Themes from '../../utils/ThemeUtil';

import IconInput from './IconInput';

const store = new Store({
    inputOneVal: '',
    inputTwoVal: '',
    inputThreeVal: ''
});

const stories = storiesOf('Components', module);
stories.addDecorator(withKnobs);

stories.add('IconInput', () => {

    return (
        <ThemeProvider theme={Themes.main}>
            <State store={store}>
    
                <IconInput type="text" placeholder="With Icon" icon="spinner" />
                <IconInput type="text" placeholder="With Left Icon" icon="spinner" left />

                <IconInput type="text" placeholder="Search" icon="search" />
                <IconInput type="text" placeholder="Search Left" icon="search" left />

                <IconInput type="text" placeholder="With Spinning Icon" icon="spinner" spin />
                <IconInput type="text" placeholder="With Pulsing Icon" icon="spinner" pulse />

                <IconInput type="text" placeholder="With Hidden Icon" icon="search" hideIcon={boolean('Hide Search Icon', true)} />
            </State>
        </ThemeProvider>
    );
});