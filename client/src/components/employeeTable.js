import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';


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

class EmployeeTable extends Component {
    render() {
        let count = 1;
        const { data: { loading, employees }, viewEmployee, createEmployee } = this.props;
        if (loading) {
            return null;
        }

        return (
            <div className='component'>
                <h2 className='title'>Employees</h2>
                <Button variant="contained" color="default" aria-label="Add" size='small' onClick={createEmployee}>
                    <AddIcon />
                </Button>                <Paper elevation={2}>
                    <table className="table">
                        <thead className='bg-primary'>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Salary</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map(employee => (
                                <tr key={employee.id} className="item" onClick={() => viewEmployee(employee.id, employee.first, employee.last, employee.email, employee.phone, employee.salary)}>
                                    <th scope="row">{count++}</th>
                                    <td>{employee.first} {employee.last}</td>
                                    <td>{employee.email}</td>
                                    <td>{`(${employee.phone[0]}${employee.phone[1]}${employee.phone[2]}) ${employee.phone[3]}${employee.phone[4]}${employee.phone[5]}-${employee.phone[6]}${employee.phone[7]}${employee.phone[8]}${employee.phone[9]}`}</td>
                                    <td>{'$' + employee.salary}</td>
                                </tr>))}
                        </tbody>
                    </table>
                </Paper>
            </div>
        );
    }
}

export default graphql(EmployeeQuery)(EmployeeTable);