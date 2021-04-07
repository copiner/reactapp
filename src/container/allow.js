import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Allowed from '../component/allow';
import * as allowAct from '../actions/allow'

const mapStateToProps  = (state) => ({
    allowList: state.allow
});

const mapDispatchToProps = (dispatch) => ({
    allowAct: bindActionCreators(allowAct, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Allowed);
