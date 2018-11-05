import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import gql from "graphql-tag";
import { graphql } from "react-apollo";

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

const RemoveMutation = gql`
mutation($id: ID!) {
    removeEmployee(id: $id)
  }
`;


class ViewDeleteEmployee extends Component {

    _removeEmployee = async e => {
        await this.props.removeEmployee({
            variables: {
                id: this.props.id
            },
            update: store => {
                const data = store.readQuery({ query: EmployeeQuery });
                data.employees = data.employees.filter(x => x.id === this.props.id);
                store.writeQuery({ query: EmployeeQuery, data });
            }
        });
        window.location.reload(false);
    }

    render() {
        const { id, first, last, email, phone, salary, viewTable, editEmployee } = this.props;
        return (
            <div className='component'>
                <h2 className='title'>Employee Record</h2>

                <Button variant="contained" color="default" aria-label="Add" size='small' onClick={editEmployee}>
                    <EditOutlinedIcon />
                </Button>
                <Button variant="contained" color="default" aria-label="Add" size='small'>
                    <DeleteOutlinedIcon data-toggle="modal" data-target="#deletePermanent" />
                </Button>
                <Paper elevation={2} className='record'>
                    <div className='data'>
                        <b>Employee ID</b>
                        <div>{id}</div>
                    </div>
                    <div className='data'>
                        <b>Full Name</b>
                        <div>{first} {last}</div>
                    </div>
                    <div className='data'>
                        <b>Email</b>
                        <div>{email}</div>
                    </div>
                    <div className='data'>
                        <b>Phone</b>
                        <div>{`(${phone[0]}${phone[1]}${phone[2]}) ${phone[3]}${phone[4]}${phone[5]}-${phone[6]}${phone[7]}${phone[8]}${phone[9]}`}</div>
                    </div>
                    <div className='data'>
                        <b>Salary</b>
                        <div>{'$' + salary}</div>
                    </div>
                </Paper>
                <button className='btn btn-primary' onClick={viewTable}>Back</button>

                <div className="modal fade" id="deletePermanent" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="ModalLabel"><b>Warning!</b></h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body bg-danger">
                                Are you sure you want to delete this employee record permanently?
      </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={e => this._removeEmployee(e)}><DeleteIcon /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default graphql(RemoveMutation, { name: 'removeEmployee' })(ViewDeleteEmployee);
