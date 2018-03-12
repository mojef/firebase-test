import React, { Component } from 'react';
import firestore from '../firestore';
import Row from './Row';
import ReactTable from 'react-table'

// break out form into components
// add dynamic input fields dropdowns -- see: https://goshakkk.name/array-form-inputs/
// style results form
// 


class LookupForm extends Component {
  constructor(props) {
    super(props);
  }

  


  render() {


    const formStyle = {
      display: 'flex',
      justifyContent: 'left',
      alignItems: 'center'
    }
    const pad = {
      padding: '5px'
    }
    const submitStyle = {
      width: '150px'
    }

    return (


      <div className="row">
        <div>
          <form id="search-form"  className={formStyle}>
            <div className="row ">
              <div className="input-field col s3">
                <input type="text" placeholder="Name" ref={el => this.inputName = el} />
              </div>
              <div className="input-field col s1">
                <input type="text" placeholder="Type" ref={el => this.inputType = el} />
              </div>
              <div className="input-field col s1">
                <input type="text" placeholder="Region" ref={el => this.inputRegion = el} />
              </div>
                <div className="input-field col s3">
                  <input type="text" placeholder="Address" ref={el => this.inputAddress = el} />
                </div>
                <div className="input-field col s2">
                  <input type="text" placeholder="City" ref={el => this.inputCity = el} />
                </div>
                <div className="input-field col s1">
                  <input type="text" placeholder="State" ref={el => this.inputState = el} />
                </div>
                <div className="input-field col s1">
                  <input type="text" placeholder="Zip" ref={el => this.inputZip = el} />
                </div>

            </div>
            <div className="row">
              <div className="input-field col s3">
                <input type="email" placeholder="Email" ref={el => this.inputEmail = el} />
              </div>
              <div className="input-field col s3">
                <input type="tel" placeholder="Phone" ref={el => this.inputPhone = el} />
              </div>
              <div className="input-field col s3">
                <input type="text" placeholder="Website" ref={el => this.inputWebsite = el} />
              </div>
              <div className="input-field col s3">
                <input type="text" placeholder="notes" ref={el => this.inputnotes = el} />
              </div>
              <div className="row">

                <button className="btn waves-effect waves-light" type="submit" onClick={this.props.submit.bind(this)}>Submit</button>
                <a className="waves-effect waves-teal btn-flat" onClick={this.props.clear} >Clear Results</a>

              </div>
            </div>

          </form>
        </div>

      </div>

    );

  }
}

export default LookupForm;