import { mapOperatorByID } from '../utils/OperatorUtil';

class RealTimeEntry {
    constructor(data) {
        this.route = data.route; 
        this.operator = mapOperatorByID(data.operator);
        this.origin = data.origin; 
        this.destination = data.destination; 
        this.dueTime = data.duetime; 
    }
}; 

export default RealTimeEntry; 