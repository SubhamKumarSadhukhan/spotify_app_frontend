import { Rating} from '@mui/material';
import {useState} from "react"
import {useDispatch} from "react-redux"
export default function Ratings({rate}) {
    const [rateing,setRating]=useState(rate)
  return (
    <Rating
        name="simple-controlled"
        value={rateing}
         onChange={(event, newValue) => {
    setRating(newValue);
  }}
      />
  )
}
