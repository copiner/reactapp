import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Temple from '../component/temple';

import * as templeAct from '../actions/temple'

const mapStateToProps  = (state) => ({
     templeList: state.temple
});

const mapDispatchToProps = (dispatch) => ({
  templeAct: bindActionCreators(templeAct, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Temple);
