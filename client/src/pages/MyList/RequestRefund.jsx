import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

 function Requestrefund({ticket, context, onSumbit, cancelNo, open, reason}) {
  

  return (
    <div>
      
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Cancel Event and Request for Refund</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide reason why you like to cancel this event
          </DialogContentText>
          <textarea
            autoFocus
            margin="dense"
            id="name"
            rows="4" 
            cols="50"
            onChange={(e)=>reason(e)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onSumbit} color="primary">
            Sumbit
          </Button>
          <Button onClick={cancelNo} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Requestrefund;