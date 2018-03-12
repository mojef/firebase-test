import React, { Component } from 'react';
import firestore from '../firestore';
import Row from './Row';
import LookupForm from './LookupForm';
import QuerySelector from './QuerySelector';
import ReactTable from 'react-table'
import _ from 'lodash'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import RaisedButton from 'material-ui/RaisedButton/RaisedButton';


// break out form into components
// add dynamic input fields dropdowns -- see: https://goshakkk.name/array-form-inputs/
// style results form
// 


class Lookup extends Component {
  constructor(props) {
    super(props);
    this.state = { results: [], querySelectors: [{ index: 0, name: "", value: "" }] }; // <- set up react state
    this.choice = "records"
    this.collection = firestore().collection(this.choice);
  }

  handleQuerySelectorChange = (qs, index) => {


    let changedSelector = this.state.querySelectors.filter((s, sidx) => index === sidx)
    changedSelector[0].name = qs.name;
    changedSelector[0].value = qs.value;
    const newQuerySelectors = _.cloneDeep(this.state.querySelectors);
    newQuerySelectors[index] = changedSelector[0];

    this.setState({
      querySelectors: newQuerySelectors
    });
  }


  buildQuery = () => {

    var query;

    if (this.state.querySelectors.length < 1) {
      query = this.collection.where(this.state.querySelectors[0].name, "==", this.state.querySelectors[0].value)

    } else {
      this.state.querySelectors.forEach((qs) => {
        //createquery for each selectors
        if (query) {
          query = query.where(qs.name, "==", qs.value)
        } else {
          query = this.collection.where(qs.name, "==", qs.value)
        }
      })
    }
    return query;

  };

  handleSubmit = (evt) => {
    this.queryTable();

  }

  handleAddQuerySelector = () => {
    this.setState({
      querySelectors: this.state.querySelectors.concat([{ index: this.state.querySelectors.length }])
    });
  }

  handleRemoveQuerySelector = (qs) => () => {
    this.setState({
      querySelectors: this.state.querySelectors.filter((s, sidx) => qs.props.index !== sidx)
    })
  }


  componentWillMount = () => {

    let records = firestore().collection(this.choice);

    records.orderBy("createdAt").get().then(function (querySnapshot) {

      querySnapshot.forEach(function (doc) {

        //console.log('doc data::', doc.data()  );
      })

    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

  }



  clearResults = () => {
    this.setState({ results: [] })
  }



  queryTable = () => {

    const timestamp = new Date();

    this.buildQuery().get().then((querySnapshot) => {

      this.setState({ results: querySnapshot.docs.map(doc => doc.data()) })

      console.log(`${this.state.results.length} results found`);
    }).catch((error) => {
      console.log("Error getting document:", error);
    });

    //this.clearForm();
  }



  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'Type',
        accessor: 'type'
      },
      {
        Header: 'Address',
        accessor: 'address'
      },
      {
        Header: 'City',
        accessor: 'city'
      },
      {
        Header: 'State',
        accessor: 'state'
      },
      {
        Header: 'Zip',
        accessor: 'zip'
      },
      {
        Header: 'Region',
        accessor: 'region'
      },
      {
        Header: 'Email',
        accessor: 'email'
      },
      {
        Header: 'Phone',
        accessor: 'phone'
      },
      {
        Header: 'Website',
        accessor: 'website'
      },
      {
        Header: 'Notes',
        accessor: 'notes'
      },

    ];

    const styles = {
      rowPadding: {
        paddingTop: 20,
        paddingBottom: 20
      }
    }
    return (
      <div>

        <h3>Search Form</h3>
        {this.state.querySelectors.map((qs, idx) => (
          <QuerySelector key={idx} index={idx} handleChange={this.handleQuerySelectorChange} remove={this.handleRemoveQuerySelector} />
        ))}


        <section style={styles.rowPadding}>
          <FloatingActionButton mini={true} onClick={this.handleAddQuerySelector}> <ContentAdd />  </FloatingActionButton>
        </section>

        <RaisedButton onClick={this.handleSubmit}>Submit</RaisedButton>



        <h4>Results</h4>
        <ReactTable
          showPagination={false}
          data={this.state.results}
          columns={columns}
          minRows={0}
        />

      </div>
    );

  }
}

export default Lookup;