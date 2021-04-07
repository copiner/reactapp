import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Detail from '../component/detail';

import * as detailAct from '../actions/detail'

const mapStateToProps  = (state) => ({
     detailList: state.detail
});

const mapDispatchToProps = (dispatch) => ({
  detailAct: bindActionCreators(detailAct, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Detail);
