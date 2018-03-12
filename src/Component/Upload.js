import React, { Component } from 'react';
import firestore from '../firestore';
import Papa from 'papaparse'

class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = { msg: "hi" }; // <- set up react state
    }


    componentWillMount() {


    }
    clearInput() {
        document.getElementById("csv-file").value = null;
    }

    handleFileUpload = (event) => {
        this.setState({ msg: "" });
        let dbRef = firestore().collection('records');
        let batch = firestore().batch();
        const file = event.target.files[0];
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {

                if (results.data.length < 500) {
                    results.data.forEach((row) => {
                        row.updatedAt = new Date();
                        batch.set(dbRef.doc(), row)
                    });

                    batch.commit().then(() => {
                        this.setState({ msg: "success! " + results.data.length + " added" });

                        this.clearInput();
                    }).catch((error) => {
                        console.log(error);
                        // this.setState({msg :   error});
                    });
                } else {
                    this.setState({ msg: "Can't parse more that 500 lines! length:" + results.data.length });
                }
            },
            error: (error, file) => {
                this.setState({
                    msg: `Error in parsing!
              ${error}`
                });
            }

        });
    }
    render() {
        return (
            <div className="section">
                <h2>Upload</h2>
                <input type="file" id="csv-file" name="files" onChange={this.handleFileUpload} />
                <div className="section">
                    <p>{this.state.msg}</p>
                </div>

            </div>
        );

    }



}
export default Upload;