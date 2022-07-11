import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import {  Link, Container, Typography } from '@mui/material';
import {AddSongForm} from "../sections/addsong"
import { getartists } from "../redux/actions/userAction";
import { useDispatch } from 'react-redux';
import {useEffect} from "react"
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));
const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(0, 0),
}));
export default function AddSong() {
  const dispatch=useDispatch()
    useEffect(()=>{
      async function fetchartists(){
    dispatch(getartists())
  }
    fetchartists()
  },[dispatch])
  return (
    <RootStyle>
        <Container maxWidth="sm">
          <ContentStyle>
            <Typography variant="h4" gutterBottom>
              Add a new Song
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 1 }}>Enter song details below.</Typography>
            <AddSongForm />
          </ContentStyle>
        </Container>
      </RootStyle>)
}
