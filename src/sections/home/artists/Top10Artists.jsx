import {Typography,Paper,Box,Grid,} from '@mui/material';
import { styled ,TableBody,TableRow,TableHead,TableContainer,tableCellClasses,TableCell,Table} from '@mui/material';
import moment from "moment"
import {useSelector,useDispatch} from "react-redux"
import {useEffect} from "react"
import {gettop10artists} from "../../../redux/actions/userAction"
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
  const top10artists=useSelector(state=>state.top10artists)
  useEffect(()=>{
    dispatch(gettop10artists())
  },[dispatch])
  return (
    <Paper sx={{ width: '100%',"& td": {borderBottom:0 } }} >
      <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={2} alignItems="center" justifyContent="center" align="center">
        <Grid item xs={6} align="left" p={5} mt={5}>
          <Typography variant="h5" pl={5} component="h2">
          Top 10 Artists
        </Typography>
        </Grid>
        <Grid item xs={6} align="right" p={5} mt={5}>
        
        </Grid>
      </Grid>
       <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow >
            <StyledTableCell align="center">Artists</StyledTableCell>
            <StyledTableCell align="center">Date of birth</StyledTableCell>
            <StyledTableCell align="center">Songs</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {top10artists.map((row,idx) => {
            let k=""
            row.songs.forEach((value,idx)=>{
              if(idx!==row.songs.length-1)
            k+=value+","
            else 
            k+=value})
            return (
            <StyledTableRow key={idx}>
              <StyledTableCell align="center">{row.name}</StyledTableCell>
              <StyledTableCell align="center">{moment(row.dob).format('LL')}</StyledTableCell>
              <StyledTableCell align="center">{k}</StyledTableCell>
            </StyledTableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    </Paper>
  );
}
