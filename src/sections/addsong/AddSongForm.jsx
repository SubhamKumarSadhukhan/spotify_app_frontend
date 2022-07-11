import * as Yup from 'yup';
import {useState} from "react"
import { useFormik, Form, FormikProvider } from 'formik';
import { useSelector } from "react-redux";
import {  Stack,TextField,FormControl,OutlinedInput,MenuItem,InputLabel,Select,useTheme,Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider,DesktopDatePicker } from '@mui/x-date-pickers';
import {useDispatch} from "react-redux"
import AddArtist from './AddArtist';
import { addsong} from "../../redux/actions/userAction"
function getStyles(name, artistsId, theme) {
  return {
    fontWeight:
      artistsId.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 500,
    },
  },
};
export default function AddSongForm() {
     const theme = useTheme();
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(new Date());
    const [artistsId, setArtistsId] = useState([]);
    const artists=useSelector(state=>state.artists)
     const AddSongSchema = Yup.object().shape({
        name:Yup.string().required('Name is required'),
    date_of_release: Yup.date("NOT DATE"),
    artist_id:Yup.array().of(Yup.number()).required(),
    file:Yup.mixed()
  });
  const formik = useFormik({
    initialValues: {
      name: '',
      date_of_release: '',
      artist_id:[],cover:"cover"
    },
    validationSchema: AddSongSchema,
    onSubmit: async (values, { setSubmitting }) => {
        values.date_of_release=new Date(value).toISOString()
        values.artist_id=artistsId
        console.log(values)
      dispatch(addsong(values))
    },
  });
  const {  isSubmitting,} = formik;
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleSelectChange = (event) => {
    const {
      target: { value },
    } = event;
      console.log(value)

    setArtistsId(
      // On autofill we get a stringified value.
      value
    );
  };
  const handleFormSubmit=(e)=>{
    e.preventDefault();
let formData = new FormData(e.currentTarget);
console.log("artistsId",artistsId)
formData.set("artist_id",JSON.stringify(artistsId))
formData.set("date_of_release",value.toISOString())
dispatch(addsong(formData))
  }
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <Stack spacing={3} sx={{ my: 2 }}>
        <TextField
            fullWidth
            autoComplete="name"
            type="name"
            label="Song Name"
            name="name"
          />
          <Stack direction="row" justifyContent="space-between" spacing={1}>
  <FormControl sx={{  width: 300 }} >
        <InputLabel id="demo-multiple-name-label">Artists</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          value={artistsId}
          onChange={handleSelectChange}
          name="artist_id"
          input={<OutlinedInput label="Artists" />}
          MenuProps={MenuProps}
        >
          {artists.map((item) => (
            <MenuItem
              key={item.id}
              value={item.id}
              style={getStyles(item.name, artistsId, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
         
      </FormControl>
  <Button
  variant="contained"
  component="label" onClick={handleClickOpen}
>
  Add Artist
</Button>
</Stack>
  <AddArtist open={open} setOpen={setOpen}/>
        
          <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Release Date"
          inputFormat="MM/dd/yyyy"
          value={value}
          name="date_of_release"
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </LocalizationProvider>
          <Button
  variant="contained"
  component="label"
>
  Upload File
  <input
    type="file"
    hidden
     accept="image/png,image/jpeg"
    name="file"
  />
</Button>
        </Stack>
        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Add Song
        </LoadingButton>
      </Form>
      </FormikProvider>
  )
}
