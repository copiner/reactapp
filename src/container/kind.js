import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Kind from '../component/kind';


import * as kindAct from '../actions/kind'

const mapStateToProps  = (state) => ({
     kindList: state.kind
});

const mapDispatchToProps = (dispatch) => ({
  kindAct: bindActionCreators(kindAct, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Kind);
