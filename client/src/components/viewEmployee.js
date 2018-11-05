import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';



class ViewEmployee extends Component {

    _deleteEmployee = id => {
        this.props.viewTable();
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
                        <div>{phone}</div>
                    </div>
                    <div className='data'>
                        <b>Salary</b>
                        <div>{salary}</div>
                    </div>
                </Paper>
                <button className='btn btn-primary' onClick={viewTable}>Back</button>

                <div class="modal fade" id="deletePermanent" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="ModalLabel"><b>Warning!</b></h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body bg-danger">
                                Are you sure you want to delete this employee record permanently?
      </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" onClick={this._deleteEmployee}><DeleteIcon /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (ViewEmployee);
