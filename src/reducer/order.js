import {
  ORDER_START,
  ORDER_SUCCESS,
  ORDER_FAIL
} from '../actions/order';

let initstatus = {
  list:null,
  text:'detail'
}

const deviceReducer = (state = initstatus, action) => {

    switch(action.type) {
        case ORDER_SUCCESS:
            return {...state, list: action.order}
        case ORDER_FAIL:
            return {...state,error: action.error}
    }
    return state;
};

export default deviceReducer;
