import { mapOperator } from '../utils/OperatorUtil';

class Stop {
    
    constructor(data) {
        if (data) {
            this.stopId = data.stopid; 
            this.stopName = data.fullname || data.displaystopid; 
            this.operators = data.operators.map(originalOperator => mapOperator(originalOperator));
            this.latitude = parseFloat(data.latitude); 
            this.longitude = parseFloat(data.longitude); 
        } else {
            this.stopId = '';
            this.stopName = '';
            this.operators = [];
            this.latitude = '';
            this.longitude = '';
        }
    }

}; 

export default Stop; 