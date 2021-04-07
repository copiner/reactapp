import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Order from '../component/order';

import * as orderAct from '../actions/order'

const mapStateToProps  = (state) => ({
     orderList: state.order
});

const mapDispatchToProps = (dispatch) => ({
  orderAct: bindActionCreators(orderAct, dispatch)
});


export default connect(mapStateToProps, mapDispatchToProps)(Order);
