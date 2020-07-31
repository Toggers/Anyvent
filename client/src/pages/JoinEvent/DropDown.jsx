import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import filestackReact from 'filestack-react';

const useStyles = makeStyles((theme) => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function DropDown({onFilter}) {
  const classes = useStyles();
  const [age, setAge] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  function handleClick(type) {
    console.log('hi')
    onFilter(type)
  }

  return (
    <div>
      <Grid container alignItems="center">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Filter</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={age}
          onChange={handleChange}
        >
          <MenuItem value="" onClick={() => handleClick("")}>
            <em>None</em>
          </MenuItem>
          <MenuItem value={10} onClick={() => handleClick("Hackathon")}>Hackathons</MenuItem>
          <MenuItem value={20} onClick={() => handleClick("Concert")}>Concerts</MenuItem>
          <MenuItem value={30} onClick={() => handleClick("Convention")}>Conventions</MenuItem>
          <MenuItem value={40} onClick={() => handleClick("Art Show")}>Art Shows</MenuItem>
        </Select>
      </FormControl>
      </Grid>
    </div>
  );
}

export default DropDown