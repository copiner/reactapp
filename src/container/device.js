import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Device from '../component/device';

import * as deviceAct from '../actions/device'

const mapStateToProps  = (state) => ({
     deviceList: state.device
});

const mapDispatchToProps = (dispatch) => ({
  deviceAct: bindActionCreators(deviceAct, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Device);
