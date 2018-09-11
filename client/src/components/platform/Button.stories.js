import React from 'react';
import { storiesOf } from '@storybook/react';
import styled, { ThemeProvider } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Themes from '../../utils/ThemeUtil';

import Button from './Button';

const stories = storiesOf('Components', module);

const Container = styled.div`
    margin: 1rem; 
`

stories.add('Button', () => (
    <ThemeProvider theme={Themes.main}>
        <div>
            <Container>
                <Button>Button</Button>
            </Container>
            
            <Container>
                <Button>
                    <FontAwesomeIcon icon="search" />
                </Button>
            </Container>
        </div>
    </ThemeProvider>
));