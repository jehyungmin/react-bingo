import React, { Component } from 'react';
import * as utils from '../../components/utils'; 
import Cell from '../../components/cells/Cells';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import '../../App.css';

class BingoMain extends Component {
  constructor(props){
    super(props);
    this.state={
      restartGame: this.props.restartGame,
      startGame: this.props.startGame,
      array1: ['','','','','','','','','','','','','','','','','','','','','','','','',''],
      array2: ['','','','','','','','','','','','','','','','','','','','','','','','','']
    }
  }

  async handleRoad() {
    let array1 = utils.random();
    let array2 = utils.random();

    await this.setState({
      array1,
      array2
    }) 
    this.props.roadNumToP1(this.state.array1);
    this.props.roadNumToP2(this.state.array2);
  }

  handleReStart() {
   this.state.restartGame();
    this.handleRoad();
  }

  handleStart() {
    this.state.startGame();
    this.handleRoad()
  }

  render() {
    let { isPlaying } = this.props;
    
    return(
      <div>
        <div>
          <div className="App position">
            {!isPlaying 
              ? <Button type="primary" block onClick={() => this.handleStart()}>게임 시작</Button> 
              : <Button type="primary" block onClick={() => this.handleReStart()}>게임 재시작</Button>}
          </div>
          <div className="container App">
            <p>P1</p>
            <Cell name="p1" array={this.state.array1}/>
          </div>
          <div></div>
          <div className="container App">
            <p>P2</p>
            <Cell name="p2" array={this.state.array2}/>
          </div>
        </div>
      </div>
    )
  }
}

export default BingoMain;
