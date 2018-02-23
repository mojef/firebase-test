import React, { Component } from 'react';
import firestore from './firestore';
import Row from './Component/Row';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { rows: [] }; // <- set up react state
  }

  componentWillMount() {
    const that = this;
    
    let records = firestore().collection('records');
    

    
    records.orderBy("createdAt").onSnapshot(function (snap) {
      
      if (snap.docs.length > 0){
        let row =  snap.docs[ snap.docs.length -1 ].data();

        that.setState({ rows: [row].concat( that.state.rows) })


      }
      console.log('this.state ', that.state.rows );

    });



    records.orderBy("createdAt").get().then(function(querySnapshot) {
        
      querySnapshot.forEach(function(doc) {

         //console.log('doc data::', doc.data()  );
      })      
     
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    
  }

  addRow(e) {
    e.preventDefault(); // <- prevent form submit from reloading the page

    const timestamp = new Date();

    firestore().collection('records').doc().set({ name: this.inputEl.value, createdAt: timestamp  });
    this.inputEl.value = ''; // <- clear the input
  }

  render() {
    const style = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    } 
    return (
      
      <div>
        <div style={style}>
          <form onSubmit={this.addRow.bind(this)}>
            <input type="text" ref={el => this.inputEl = el} />
            <input type="submit" />
            <ul>
              { /* Render the list of rows */
                this.state.rows.map( (row, i) => <li key={i}> <Row  data={row} /> </li> )
              }
            </ul>
          </form>
        </div>
      </div>

    );
    
  }
}

export default App;