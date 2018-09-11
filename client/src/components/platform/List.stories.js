import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ThemeProvider } from 'styled-components';
import Themes from '../../utils/ThemeUtil';

import List from './List';
import ListItem from './ListItem';

const stories = storiesOf('Components', module);

const CustomListItem = ({ item }) => {
    return (
        <ListItem>CUSTOM: {item}</ListItem>
    );
};

stories.add('List', () => (
    <ThemeProvider theme={Themes.main}>
        <div>
            <List onItemClick={action('listitem-clicked')} items={[1, 2, 3]}></List>
            <List onItemClick={action('listitem-clicked')} title="With Title" items={[4, 5, 6]}></List>
            <List title="With Custom Item Render" 
                items={[7, 8, 9]} renderBy={CustomListItem}></List>
        </div>
    </ThemeProvider>
));