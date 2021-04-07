import {
  DETAIL_SUCCESS,
} from '../actions/detail';

let initstatus = {
  list:null,
  text:'detail'
}

const detailReducer = (state = initstatus, action) => {

    switch(action.type) {
        case DETAIL_SUCCESS:
            return {...state, list:action.detail}
    }
    return state;
};

export default detailReducer;
