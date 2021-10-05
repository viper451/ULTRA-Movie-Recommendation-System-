import React, { useState, useEffect } from 'react';
import Axios from 'axios'
import { useSelector } from 'react-redux';
import Rating from '@mui/material/Rating';

export default function BasicRating(props) {
  const [value, setValue] = useState(1);
  const user = useSelector(state => state.user);

    useEffect(() => {
        console.log(props)
    }) 

  return (
      <Rating
        name="simple-controlled"
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
            console.log(newValue)

            const variables = {
                writer: props.UserData,
                postId: props.postId,
                rating: newValue
            }

            console.log(variables)

            Axios.post('/api/rating/user_rating', variables)
            .then(response => {
                if (response.data.success) {
              
                } else {
                    alert('Failed to save Comment')
                }
            })
        }}
      />
  );
}
