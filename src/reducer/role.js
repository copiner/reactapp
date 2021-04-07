import {
    ROLE_SUCCESS,
    ROLE_FAIL,
    ROLEADD_SUCCESS,
    ROLEUPDATE_SUCCESS,
    ROLEDELETE_SUCCESS,
    ROLEENABLE_SUCCESS,
    ROLEDISABLE_SUCCESS,

    ROLEMENU_SUCCESS,
    ROLESETMENU_SUCCESS,
    ROLEUSER_SUCCESS,
    ROLEDELUSER_SUCCESS
} from '../actions/role';

let initstatus = {
  loading:false,
  list:null,//表单数据
  text:'role',
  user:[],
  menu:[]
}

const roleReducer = (state=initstatus , action) => {
    switch(action.type) {
        case ROLE_SUCCESS:
            return {...state, list: action.role}
        case ROLE_FAIL:
            return {...state, error: action.error}
        case ROLEADD_SUCCESS:
            return {...state }
        case ROLEUPDATE_SUCCESS:
            return {...state}
        case ROLEDELETE_SUCCESS:
            return {...state }
        case ROLEENABLE_SUCCESS:
            return {...state }
        case ROLEDISABLE_SUCCESS:
            return {...state }
        case ROLEMENU_SUCCESS:
            return {...state, menu:action.menu }
        case ROLESETMENU_SUCCESS:
            return {...state }
        case ROLEUSER_SUCCESS:
            return {...state, user:action.user }
        case ROLEDELUSER_SUCCESS:
            return {...state }
    }
    return state;
}


export default roleReducer
