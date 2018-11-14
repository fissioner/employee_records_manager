import React, { Component } from 'react';
import gql from "graphql-tag";
import { graphql } from "react-apollo";
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from '@material-ui/core/CircularProgress';



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

    _salaryFormat = (num) => {
        num = String(num);
        return `$${num.substring(0, num.length-3)},${num.substring((num.length - 3), num.length)}`;
    }

    render() {
        let count = 1;
        const { data: { loading, employees }, viewEmployee, createEmployee } = this.props;
        if (loading) {
            return (
            <div id='loading'>
            <h3 >Loading</h3>
            <p>Please Wait</p>
                <CircularProgress />
            </div>);
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
                                    <td>{employee.phone.length>9 ? `(${employee.phone.substring(0,3)}) ${employee.phone.substring(3, 6)}-${employee.phone.substring(6)}`:employee.phone}</td>
                                    <td>
                                    {employee.salary > 999 ?
                                        this._salaryFormat(employee.salary) :
                                        `$${employee.salary}`}
                                        </td>
                                </tr>))}
                        </tbody>
                    </table>
                </Paper>
            </div>
        );
    }
}

export default graphql(EmployeeQuery)(EmployeeTable);