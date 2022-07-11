import {useState} from 'react';
import {Box,Button,Dialog,TextareaAutosize,DialogActions,DialogContent,FormControl,Stack,TextField,DialogTitle} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider,DesktopDatePicker } from '@mui/x-date-pickers';
import {useDispatch} from "react-redux"
import {addartist} from "../../redux/actions/userAction"
export default function AddArtist({open,setOpen}) {
    const dispatch=useDispatch()
  const [value, setValue] = useState({dob:new Date(),name:"",bio:""});
    const handleChange = (newValue) => {
        if(newValue.target){
        console.log(newValue.target.name)

setValue({...value,[newValue.target.name]:newValue.target.value});
        }else
    setValue({...value,dob:newValue});
  };
  const handleClose = () => {
    setOpen(false);
  };
  const submitClick=()=>{
    value.dob=new Date(value.dob).toISOString()
    console.log(value)
    dispatch(addartist(value))
  }
  return (
    <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Add Artists</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <FormControl sx={{ mt: 2, minWidth: 300 }}>
              <Stack spacing={3} sx={{ my: 2 }}>
              <TextField
            fullWidth
            autoComplete="name"
            type="name"
            label="Name"
            name="name"
            onChange={handleChange}
          />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Date of Birth"
          inputFormat="MM/dd/yyyy"
          value={value.dob}
          name="dob"
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
          <TextareaAutosize
           minRows={5}
            fullWidth
            placeholder="Enter Bio"
            name='bio'
            onChange={handleChange}
          />
        </Stack>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="outlined" style={{
        borderColor: "#616161",color:"#616161"
    }}>Cancel</Button>
          <Button onClick={submitClick} style={{
        backgroundColor: "#616161",
    }} variant="contained"> Done</Button>
        </DialogActions>
      </Dialog>
  )
}
