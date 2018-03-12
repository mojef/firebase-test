import React, { Component } from 'react';


class Row extends Component {


  render() {


    return  (
      <tr>
        <td>{this.props.data.name}</td>
        <td> {this.props.data.type} </td>
        <td> {this.props.data.address} </td>

        <td> {this.props.data.city}  </td>
        <td>{this.props.data.state} </td>
        <td> {this.props.data.zip} </td>

        <td>{this.props.data.region} </td>
        <td> {this.props.data.email}</td>
        <td>{this.props.data.phone} </td>
        
        <td>{this.props.data.website} </td>
        <td>  {this.props.data.notes} </td> 
    </tr>
      )

  }
}


export default Row;