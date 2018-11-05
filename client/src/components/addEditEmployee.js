import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';

class AddEditEmployee extends Component {

    _updateEmployee = () => {
        this.props.viewTable();
    }

    render() {
        const { id, first, last, email, phone, salary, viewEmployee, viewTable, updateFirst, updateLast, updateEmail, updatePhone, updateSalary, isCreate } = this.props;
        return (
            <div className='component'>
            <h2 className='title'>
            {isCreate?
            'Create Employee Record':
            'Edit Employee Record'}
            </h2>

            <Paper elevation={2} className='record'>
                {isCreate? '' : <div className='data'>
                    <b>Employee ID</b>
                    <div>{id}</div>
                </div>}
                <div className='data'>
                    <b>First</b>
                    <input className='form-control' onChange={updateFirst} value={first} />
                </div>
                <div className='data'>
                    <b>Last</b>
                    <input className='form-control' onChange={updateLast} value={last} />
                </div>
                <div className='data'>
                    <b>Email</b>
                    <input type='email' className='form-control' onChange={updateEmail} value={email} />
                </div>
                <div className='data'>
                    <b>Phone</b>
                    <input type='tel' format="(###) ###-####" mask='' className='form-control' onChange={updatePhone} value={phone} />
                </div>
                <div className='data'>
                    <b>Salary</b>
                    <input className='form-control' onChange={updateSalary} value={salary} />
                </div>
            </Paper>
                <button id='backBtn' className='btn btn-primary' onClick={isCreate?viewTable:viewEmployee}>Back</button>
                <button className='btn btn-primary' onClick={this._updateEmployee}>Save</button>
            </div>
        );
    }
}

export default (AddEditEmployee);
