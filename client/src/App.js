import React, { Component } from 'react';
import EmployeeTable from './components/employeeTable';
import ViewDeleteEmployee from './components/viewDeleteEmployee';
import AddEditEmployee from './components/addEditEmployee';



class App extends Component {
constructor (props) {
  super(props)

  this.state = {
    isView: false,
    isEdit: false,
    isCreate: false,
    id: '',
    first: '',
    last: '',
    email: '',
    phone: '',
    salary: ''
  }
}

_editEmployee = () => {
  this.setState({ isEdit: true, isView: false });
}

_viewEmployee = () => {
  this.setState({ isView: true, isEdit: false });
}

_viewTable = () => {
  this.setState({ isEdit: false, isView: false, isCreate: false})
}

_createEmployee = () => {
  this.setState({ isCreate: true, isEdit: true, id: '', first: '', last: '', email: '', phone: '', salary: '' })
}

_selectEmployee = (id, first, last, email, phone, salary) => {
  this.setState({ id, first: first, last: last, email: email, phone: phone, salary: salary });
  this._viewEmployee();
}

_updateFirst = e => {
  this.setState({ first: e.target.value })
}

_updateLast = e => {
  this.setState({ last: e.target.value })
}

_updateEmail = e => {
  this.setState({ email: e.target.value })
}

_updatePhone = e => {
  this.setState({ phone: e.target.value })
}

_updateSalary = e => {
  this.setState({ salary: e.target.value })
}

_updateState = () => {
  this.setState({ state: this.state })
}

  render() {

    return (
      <div>
        {this.state.isView?
        <ViewDeleteEmployee
        updateState={this._updateState}
        editEmployee={this._editEmployee}
        viewTable={this._viewTable}
        id={this.state.id}
        first={this.state.first}
        last={this.state.last}
        email={this.state.email}
        phone={this.state.phone}
        salary={this.state.salary} />:
        this.state.isEdit?
        <AddEditEmployee
        isCreate={this.state.isCreate}
        viewTable={this._viewTable}
        updateFirst={this._updateFirst}
        updateLast={this._updateLast}
        updateEmail={this._updateEmail}
        updatePhone={this._updatePhone}
        updateSalary={this._updateSalary}
        viewEmployee={this._viewEmployee}
        id={this.state.id}
        first={this.state.first}
        last={this.state.last}
        email={this.state.email}
        phone={this.state.phone}
        salary={this.state.salary}
        />:
        <EmployeeTable
        viewEmployee={this._selectEmployee}
        createEmployee={this._createEmployee}
        />
        }
      </div>
    );
  }
}

export default App;
