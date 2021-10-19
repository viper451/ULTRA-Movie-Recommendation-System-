import './MovieRating.css'
import React, { useState, useEffect, Fragment } from 'react';
import Axios from 'axios'
import { useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';
import { bgcolor, borderColor } from '@mui/system';
export default function BasicRating(props) { 
   const [r,setR]=useState(0)
   const [value, setValue] = useState(0);

   const user = useSelector(state => state.user); useEffect(() => {

 Axios.get('/api/rating/user_rating/'+props.UserData+'/'+props.postId)
.then((res) => {
  let x =res.data[0].rating
 setR(x) 
console.log(x)
})
.catch(err => {
console.error(err);
});
})
function rating_number(r){
  return <ul>{[...Array(r)].map((e, i) => {
    return <span style={{color:'gold',fontSize:'300%'}}>&#9734;</span>

  })}</ul>
}
return (
<Fragment>
<Rating className="rate" style={{color: "gold" ,borderColor:'', opacity: '0.55 ',borderWidth:'solid'}}
name="custuomized-10"
value={value}
onChange={(event, newValue) => {
setValue(newValue); const variables = {
writer: props.UserData,
postId: props.postId,
rating: newValue
}
Axios.post('/api/rating/user_rating', variables)
.then((res) => console.log(res))
.catch(err => {
console.error(err);

});
 }}
/>
<p style={{color:'gold'}}>Your Ratings</p>
{rating_number(r)};
</Fragment>

);
}

