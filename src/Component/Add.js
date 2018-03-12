import React, { Component } from 'react';
import firestore from '../firestore';
import Row from './Row';

class Add extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] }; // <- set up react state
  }

  componentWillMount() {
    const that = this;

    let records = firestore().collection('records');

    records.orderBy("createdAt").onSnapshot(function (snap) {

      if (snap.docs.length > 0) {
        let row = snap.docs[snap.docs.length - 1].data();
        that.setState({ rows: [row].concat(that.state.rows) })
      }

    });



    records.orderBy("createdAt").get().then(function (querySnapshot) {

      querySnapshot.forEach(function (doc) {

        //console.log('doc data::', doc.data()  );
      })

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  }

  clearForm = () => {
    document.getElementById("populate-row").reset();
  }

  addRow(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page

    const timestamp = new Date();

    firestore().collection('records').doc().set({
      name: this.inputName.value,
      type: this.inputType.value,
      address: this.inputAddress.value,
      city: this.inputCity.value,
      state: this.inputState.value,
      zip: this.inputZip.value,
      region: this.inputRegion.value,
      email: this.inputEmail.value,
      phone: this.inputPhone.value,
      website: this.inputWebsite.value,
      notes: this.inputNotes.value,
      createdAt: timestamp,
      updatedAt: timestamp

    });
    this.clearForm();
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
          <h3>Add Data</h3>
          <form id="populate-row" onSubmit={this.addRow.bind(this)} className={formStyle}>
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
                <input type="text" placeholder="Notes" ref={el => this.inputNotes = el} />
              </div>
              <div className="row">
                 <button className="btn waves-effect waves-light" type="submit" style={submitStyle}>Submit</button>
                <a className="waves-effect waves-teal btn-flat" value="" onClick={this.clearForm} >Clear Form</a>
              </div>
            </div>

          </form>
        </div>

        <table className="highlight">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Address</th>

              <th>City</th>
              <th>State</th>
              <th>Zip</th>

              <th>Region</th>
              <th>Email</th>
              <th>Phone</th>

              <th>Website</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            {this.state.rows.map((row, i) => <Row key={i} data={row} />)}
          </tbody>
        </table>

      </div>

    );

  }
}

export default Add;