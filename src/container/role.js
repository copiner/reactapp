import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as roleAct from '../actions/role'

import Role from '../component/auth/role';

const mapStateToProps  = (state) => ({
    roleList: state.role
});

const mapDispatchToProps = (dispatch) => ({
    roleAct: bindActionCreators(roleAct, dispatch)
    //deviceAct: bindActionCreators(deviceAct, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Role);
