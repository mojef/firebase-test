import React,{Component} from 'react';


class Row extends Component {
  
  
  render() {


    return  <span> {this.props.data.name} {this.props.data.createdAt.toString() } </span> ;
  }
}


export default Row;