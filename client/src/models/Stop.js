import { mapOperator } from '../utils/OperatorUtil';

class Stop {
    
    constructor(data) {
        if (data) {
            this.stopId = data.stopid; 
            this.stopName = data.fullname || data.displaystopid; 
            this.operators = data.operators.map(originalOperator => mapOperator(originalOperator));
        } else {
            this.stopId = '';
            this.stopName = '';
            this.operators = [];
        }
    }

}; 

export default Stop; 