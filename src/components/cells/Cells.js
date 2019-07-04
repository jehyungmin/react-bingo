import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionCreators as actions } from '../../store/modules/Reducers';
import * as utils from '../utils'; 
import { Button } from 'antd';
import 'antd/dist/antd.css';
import '../../App.css';
import Graph from '../graph/Graph';


let p1 = new Array(5);
    for(let i=0; i<5; i++){
      p1[i] = new Array(5);
  }

let p2 = new Array(5);
for(let i=0; i<5; i++){
  p2[i] = new Array(5);
  }

let p1_count=0;
let p2_count=0;

let p1_TwoArray;
let p2_TwoArray;

class Cells extends Component {
  constructor(props){
    super(props)
    this.state={
      name: props.name,
    }
  }
  state = {
    size: 'large',
  };

  async handleSelect(num) {
    if(this.props.isPlaying){
      if(this.state.name===this.props.isTurn){
        await this.props.selectNum(num)
        this.props.nowTurn(this.state.name==='p1'?'p2':'p1')
        await this.applyArrayState(num);
        console.log(p1)
        await this.isComplete(p1_count,p2_count);  
      }else{
        window.alert("잘못된 차례입니다.")
      }   
    }
  }

  applyArrayState(num){
    for(let i=0; i<5; i++) {
      for(let j=0; j<5; j++) {
        if(p1_TwoArray[i][j] === num){
          p1[i][j] = 1;
          p1_count = this.isBingo(p1,1);
          console.log("p1_count;;;;;;;: " + p1_count)
        }
        if(p2_TwoArray[i][j] === num){
          p2[i][j] = 1;
          p2_count = this.isBingo(p2,1);
          console.log("p2_count;;;;;;;: " + p2_count)
        }
      }
    } 
  }

  isComplete(p1_count,p2_count){
    console.log(`1p: ${p1_count} , 2p: ${p2_count}`)
    if(p1_count>4 || p2_count>4){
      if(p1_count >=5 && p2_count < 5){
        p1_count = 0;
        p2_count = 0;
        p1 = new Array(5);
          for (let i = 0; i < 5; i++) {
            p1[i] = new Array(5);
        }
        p2 = new Array(5);
        for (let i = 0; i < 5; i++) {
          p2[i] = new Array(5);
        }
        window.alert("P1가 빙고를 완성했습니다.");
      }
      else if(p2_count >= 5 && p1_count < 5){
        p1_count = 0;
        p2_count = 0;
        p1 = new Array(5);
        for (let i = 0; i < 5; i++) {
          p1[i] = new Array(5);
        }
        p2 = new Array(5);
          for (let i = 0; i < 5; i++) {
            p2[i] = new Array(5);
        }
        window.alert("P2가 빙고를 완성했습니다.");
      }
      else{
        p1_count = 0;
        p2_count = 0;
        p1 = new Array(5);
        for (let i = 0; i < 5; i++) {
          p1[i] = new Array(5);
        }
        p2 = new Array(5);
        for (let i = 0; i < 5; i++) {
          p2[i] = new Array(5);
        }
        window.alert("무승부 입니다.");
      }
    }
  }

  componentDidMount() {
    this.setState({
      array: this.state.array
    })
  }

  isActive(isSelected,cell){  
    if(this.props.isPlaying){
      for(let i=0;i<isSelected.length;i++){
        if (Array.from(new Set(isSelected))[i] === cell) {        
          return true;
        }
      }
    }
  }

  handleSizeChange = e => {
    this.setState({ size: e.target.value });
  };

  isBingo(array,g){
    let countB=0;
      for(let i=0;i<5;i++){
          if(array[0][i]===g&&array[1][i]===g&&array[2][i]===g&&array[3][i]===g&&array[4][i]===g){ 
            countB++;
          }
      }
      for(let i=0;i<5;i++){
          if(array[i][0]===g&&array[i][1]===g&&array[i][2]===g&&array[i][3]===g&&array[i][4]===g){ 
            countB++;
          }
      }
      if(array[0][0]===g&&array[1][1]===g&&array[2][2]===g&&array[3][3]===g&&array[4][4]===g){ 
        countB++;
      }
      if(array[0][4]===g&&array[1][3]===g&&array[2][2]===g&&array[3][1]===g&&array[4][0]===g){ 
        countB++;
      }
    return countB;
  }

  render() {
    let { isSelected, array } = this.props;
    console.log('isSelected : ' + Array.from(new Set(isSelected)));
    const { size } = this.state;
    p1_TwoArray = utils.TwoArray(this.props.p1_roaded);
    p2_TwoArray = utils.TwoArray(this.props.p2_roaded);

    const buttonColor = { backgroundColor: '#68D17D' }

    return (
      <div>
        <table>
          <tbody>{utils.TwoArray(array).map((row, row_i) => {
            let cols = row;
            return <tr key={row_i}>{cols.map((cell, col_i) => {
              return <td key={col_i}>
                <Button className="btnSize"
                //클릭후 스타일지정
                  style={this.isActive(isSelected,cell,row_i,col_i)?buttonColor:null}
                  onClick={() => this.handleSelect(cell)}>{cell}
                </Button></td>
              })}</tr>
            })}</tbody>
          </table>
          {/* <Graph></Graph> */}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const { isSelected, isTurn, isPlaying, p1_roaded, p2_roaded } = state;
  return {
    isPlaying,
    isSelected,
    p1_roaded,
    p2_roaded,
    isTurn
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    nowTurn : (num) => {
      return dispatch(actions.nowTurn(num))
    },
    selectNum : (num) => {
      return dispatch(actions.clickNumber(num))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cells);

