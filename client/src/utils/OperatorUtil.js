const operators = {
    bac: {
        name: 'Dublin Bus',
        bg: '#006494',
        fg: '#FFFFFF'
    },
    BE: {
        name: 'Bus Éireann',
        bg: '#9E2A2B',
        fg: '#FFFFFF'
    },
    KB: {
        name: 'Kildare Bus'
    },
    LUAS: {
        name: 'LUAS',
        bg: '#473775',
        fg: '#FFFFFF'
    },
    ir: {
        name: 'Irish Rail',
        bg: '#065143',
        fg: '#FFFFFF'
    }
};

export const mapOperator = originalOperator => {
    const newOperator = operators[originalOperator.name];
    newOperator.code = originalOperator.name; 

    return newOperator; 
};

export const mapOperatorByID = originalOperatorID => {
    const newOperator = operators[originalOperatorID];
    newOperator.code = originalOperatorID; 

    return newOperator; 
}