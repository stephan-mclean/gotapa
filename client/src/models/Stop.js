import { mapOperator } from '../utils/OperatorUtil';

class Stop {
    constructor(data) {
        this.stopId = data.stopid; 
        this.stopName = data.fullname || data.displaystopid; 
        this.operators = data.operators.map(originalOperator => mapOperator(originalOperator)); 
    }
}; 

export default Stop; 