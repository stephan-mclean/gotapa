import React from 'react';
import { storiesOf } from '@storybook/react';
import { TabSet, Tab, TabHeading, TabBody } from './TabSet';
import { ThemeProvider } from 'styled-components';
import Themes from '../../utils/ThemeUtil';

const stories = storiesOf('Components', module);

stories.add('TabSet', () => (
    <ThemeProvider theme={Themes.main}>
        <TabSet>
            <Tab>
                <TabHeading>Tab ONE</TabHeading>
                <TabBody>Tab ONE body</TabBody>
            </Tab>
            <Tab>
                <TabHeading>Tab TWO</TabHeading>
                <TabBody>Tab TWO body</TabBody>
            </Tab>
        </TabSet>
    </ThemeProvider>
));