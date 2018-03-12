import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';

import { MenuItem, TextField, Divider, SelectField } from 'material-ui';

import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

export default class QuerySelector extends React.Component {
    constructor(props) {
        super(props);
        // queryField has the name of the field value and the value of the input value
        this.fields = [
            { name: "Name", value: "name" }, { name: "Type", value: "type" }, { name: "Region", value: "region" }, { name: "Address", value: "address" },
            { name: "City", value: "city" }, { name: "State", value: "state" }, { name: "Zip", value: "zip" }, { name: "Email", value: "email" }, { name: "Phone", value: "phone" },
            { name: "Website", value: "website" }, { name: "Notes", value: "notes" }
        ];

        this.state = { queryField: { name: this.fields[0].value, value: "" } };

        this.menuItems = this.fields.map((f, fidx) => {
            return <MenuItem key={fidx} value={f.value} primaryText={f.name} />
        })

        // this.handleQueryFieldChange = this.handleQueryFieldChange.bind(this)
        // this.handleTextInputChange = this.handleTextInputChange.bind(this)
    }

    handleRemoveQueryField = (idx) => () => {
        this.setState({
            queryFields: this.state.queryFields.filter((s, sidx) => idx !== sidx)
        });
    }


    handleQueryFieldChange = (event, index, value) => {
        this.setState({ queryField: { name: value } });
    }

    handleTextInputChange = (event, newValue) => {
        const queryField = { name: this.state.queryField.name, value: newValue }
        //update local state
        this.setState({ queryField });
        //handoff to parent
        this.props.handleChange(queryField, this.props.index);
    }

    render() {
        const styles = {

            customWidth: {
                width: 150,
            },
            flexRow: {
                display: "flex",
                alignItems: "center"
            }

        };
        return (
            <div style={styles.flexRow} >
                <SelectField style={styles.customWidth} value={this.state.queryField.name} onChange={this.handleQueryFieldChange} >
                    {this.fields.map((field, idx) => (
                        <MenuItem key={idx} value={field.value} primaryText={field.name} />
                    ))}
                </SelectField>
                <TextField name={this.state.queryField.name} onChange={this.handleTextInputChange} />

                <FloatingActionButton mini={true} onClick={this.props.remove(this)}> <ContentRemove /> </FloatingActionButton>
            </div>
        );
    }
}