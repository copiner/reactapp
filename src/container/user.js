import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { roleSt } from '../actions/role';
import * as userAct from '../actions/user';
import User from '../component/auth/user';

const mapStateToProps  = (state) => ({
    userList: state.user
});

const mapDispatchToProps = (dispatch) => ({
    roleSt: (posts) => dispatch(roleSt(posts)),
    userAct: bindActionCreators(userAct, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
