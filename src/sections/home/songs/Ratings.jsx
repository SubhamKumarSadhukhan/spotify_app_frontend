import { Rating} from '@mui/material';
import {useState} from "react"
import {useDispatch} from "react-redux"
import {ratesong} from "../../../redux/actions/userAction"
export default function Ratings({rate,song_id}) {
    const dispatch=useDispatch()
    const [rateing,setRating]=useState(rate)
    const changeHandeler=(event,newValue)=>{
       console.log({song_id,rate:newValue})
        setRating(newValue);
        dispatch(ratesong({song_id,rate:newValue}))
    }
  return (
    <Rating
        name="simple-controlled"
        value={rateing}
         onChange={changeHandeler}
      />
  )
}
