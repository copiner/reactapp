import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import * as hact  from '../actions/home';
import Home from '../component/home';

const mapStateToProps  = (state) => ({
    home: state.home
});

const mapDispatchToProps = (dispatch) => ({
    hact: bindActionCreators(hact, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
