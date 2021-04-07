import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Channel from '../component/channel';

import * as channelAct from '../actions/channel'

const mapStateToProps  = (state) => ({
     channelList: state.channel
});

const mapDispatchToProps = (dispatch) => ({
  channelAct: bindActionCreators(channelAct, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Channel);
