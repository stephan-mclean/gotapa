import styled from 'styled-components';

const getFloat = (left, right) => {
    if (left) {
        return 'left'; 
    } else if (right) {
        return 'right';
    }

    return 'none';
}

export default styled.button`
    background: ${props => !props.link ? props.theme.tertiary : 'none'};
    display: ${props => props.link ? 'inline' : 'block'};
    color: ${props => props.theme.foreground};
    text-transform: ${props => props.link ? 'none' : 'uppercase'};
    text-decoration: ${props => props.link ? 'underline' : 'none'}; 
    font-size: 0.875rem; 
    padding: ${props => props.link ? 0 : '1rem'};
    font-weight: ${props => props.link ? 'bold' : 'default' };  
    border: none; 
    font-family: 'Poppins', sans-serif;
    border-radius: 5px; 
    outline: none; 
    cursor: pointer;
    float: ${props => getFloat(props.left, props.right)};

    :active {
        background: ${props => props.theme.secondary}; 
    }
    
`;