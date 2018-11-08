import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import gql from "graphql-tag";
import { graphql, compose } from "react-apollo";

const EmployeeQuery = gql`
{
  employees {
    id
    first
    last
    email
    phone
    salary
  }
}
`;

const CreateMutation = gql`
mutation($first: String!, $last: String!, $email: String!, $phone: String!, $salary: Int!) {
    createEmployee(first: $first, last: $last, email: $email, phone: $phone, salary: $salary) {
      id
      first
      last
      email
      phone
      salary
    }
  }
`;

const UpdateMutation = gql`
mutation($id: ID!, $first: String!, $last: String!, $email: String!, $phone: String!, $salary: Int!) {
    updateEmployee(id: $id, first: $first, last: $last, email: $email, phone: $phone, salary: $salary)
  }
`;

class AddEditEmployee extends Component {

    async createEmployee(e) {
        e.preventDefault();
        await this.props.createEmployee({
            variables: {
                first: this.props.first,
                last: this.props.last,
                email: this.props.email,
                phone: this.props.phone,
                salary: parseInt(this.props.salary)
            },
            update: (store, { data: { createEmployee } }) => {
                const data = store.readQuery({ query: EmployeeQuery });
                data.employees = data.employees.push(createEmployee)
                store.writeQuery({ query: EmployeeQuery, data });
            }
        });
        this.props.viewTable();
    }

    async updateEmployee(e) {
        e.preventDefault();
        await this.props.updateEmployee({
            variables: {
                id: this.props.id,
                first: this.props.first,
                last: this.props.last,
                email: this.props.email,
                phone: this.props.phone,
                salary: parseInt(this.props.salary)
            },
            update: store => {
                const data = store.readQuery({ query: EmployeeQuery });
                data.employees = data.employees.map(x =>
                    x.id === this.props.id ?
                        {
                            id: this.props.id,
                            first: this.props.first,
                            last: this.props.last,
                            email: this.props.email,
                            phone: this.props.phone,
                            salary: this.props.salary
                        } : x);
                store.writeQuery({ query: EmployeeQuery, data });
            }
        });
        this.props.viewTable();
    }

    render() {
        const { id, first, last, email, phone, salary, viewEmployee, viewTable, updateFirst, updateLast, updateEmail, updatePhone, updateSalary, isCreate } = this.props;
        return (
            <div className='component'>
                <h2 className='title'>
                    {isCreate ?
                        'Create Employee Record' :
                        'Edit Employee Record'}
                </h2><form onSubmit={(e) => (
                    isCreate ?
                this.createEmployee(e) :
                this.updateEmployee(e))}>
                    <Paper elevation={2} className='record'>

                        {isCreate ? '' : <div className='data'>
                            <b>Employee ID</b>
                            <div>{id}</div>
                        </div>}
                        <div className='data'>
                            <b>First</b>
                            <input type='text' className='form-control' onChange={updateFirst} value={first} placeholder='Jane' required />
                        </div>
                        <div className='data'>
                            <b>Last</b>
                            <input type='text' className='form-control' onChange={updateLast} value={last} placeholder='Doe' required />
                        </div>
                        <div className='data'>
                            <b>Email</b>
                            <input type='email' className='form-control' onChange={updateEmail} value={email} placeholder='example@mail.com' required />
                        </div>
                        <div className='data'>
                            <b>Phone</b>
                            <input type='text' size='10' maxLength='10' minLength='10' className='form-control' onChange={updatePhone} value={phone} placeholder='Enter 10 digits' required />
                        </div>
                        <div className='data'>
                            <b>Salary</b>
                            <input type='number' max='1000000' className='form-control' onChange={updateSalary} value={salary} placeholder='Numbers only, e.g. 87000' required />
                        </div>
                    </Paper>
                    <button id='backBtn' type='button' className='btn btn-primary' onClick={isCreate ? viewTable : viewEmployee}>Back</button>
                    <button type='submit' className='btn btn-primary'>
                        {isCreate ? 'Create' : 'Save'}
                    </button></form>
            </div>
        );
    }
}

export default compose(
    graphql(CreateMutation, { name: 'createEmployee' }),
    graphql(UpdateMutation, { name: 'updateEmployee' })
)(AddEditEmployee);
