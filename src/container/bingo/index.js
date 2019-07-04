import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { actionCreators as actions } from '../../store/modules/Reducers';
import Bingo from './BingoMain';

const mapStateToProps = (state) => {
  const { isRePlaying, isPlaying } = state;
  return {
    isPlaying,
    isRePlaying
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    startGame: bindActionCreators(actions.startGame, dispatch),
    restartGame: bindActionCreators(actions.restartGame, dispatch),
    roadNumToP1 : (num)=>{
      return dispatch(actions.P1_road(num))
    },
    roadNumToP2 : (num)=>{
      return dispatch(actions.P2_road(num))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Bingo);