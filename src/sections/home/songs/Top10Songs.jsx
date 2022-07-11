import {Typography,Paper,Box,Grid,Button,} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {useNavigate  } from "react-router-dom"
import { styled ,Rating,TableBody,TableRow,TableHead,TableContainer,tableCellClasses,TableCell,Table} from '@mui/material';
import moment from "moment"
import {useSelector,useDispatch} from "react-redux"
import {useEffect} from "react"
import {gettop10songs} from "../../../redux/actions/userAction"
import Ratings from './Ratings';
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#616161",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

export default function Top10Artists() {
  const dispatch=useDispatch()
  const top10songs=useSelector(state=>state.top10songs)
  useEffect(()=>{
    dispatch(gettop10songs())
  },[dispatch])
  const navigate=useNavigate()
  return (
    <Paper sx={{ width: '100%',"& td": {borderBottom:0 } }} >
      <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={2} alignItems="center" justifyContent="center" align="center">
        <Grid item xs={6} align="left" p={5} mt={5}>
          <Typography variant="h5" pl={5} component="h2">
          Top 10 Songs
        </Typography>
        </Grid>
        <Grid item xs={6} align="right" p={5} mt={5}>
          <Button onClick={()=>navigate("/addsong")} style={{
        backgroundColor: "#616161",
    }} variant="contained"><AddIcon/> Add Song</Button>
        </Grid>
      </Grid>
       <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell align="center">Artwork</StyledTableCell>
            <StyledTableCell align="center">Song</StyledTableCell>
            <StyledTableCell align="center">Date of Release</StyledTableCell>
            <StyledTableCell align="center">Artists</StyledTableCell>
            <StyledTableCell align="center">Rate(AVG)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {top10songs.map((row,idx) => {
            let k=""
            row.artists.forEach((value,idx)=>{
              if(idx!=row.artists.length-1)
            k+=value+","
            else 
            k+=value})
            return (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center" >
                <img
        src={row.cover}
        alt={row.title} height={100}
        loading="lazy"
      />
              </StyledTableCell>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{moment(row.date_of_release).format('LL')}</StyledTableCell>
              <StyledTableCell align="center">{k}</StyledTableCell>
              <StyledTableCell align="center"><Ratings song_id={row.id} rate={row.rate}/></StyledTableCell>
            </StyledTableRow>
          )}
          )}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </Paper>
  );
}
