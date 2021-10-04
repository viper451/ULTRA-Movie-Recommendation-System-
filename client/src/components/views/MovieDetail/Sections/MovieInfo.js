import React from 'react'
import { useState } from 'react';
import { MDBBadge } from 'mdb-react-ui-kit';
import './MovieInfo.css';
function MovieInfo(props) {


  const { movie } = props;
// console.log(movie.genres.length)
const setGenres=movie.genres
// console.log(setGenres)

  return (
    // <Descriptions title="Movie details" bordered size='default'>
    //   <Descriptions.Item style={{ padding: '400px' }} label="Title">{movie.original_title}</Descriptions.Item>
    //   <Descriptions.Item >{movie.release_date}</Descriptions.Item>
    //   <Descriptions.Item >{movie.revenue} USD</Descriptions.Item>
    //   <Descriptions.Item >{movie.runtime} minutes</Descriptions.Item>
    //   <Descriptions.Item>{movie.vote_count}</Descriptions.Item>
    //   {/* <Descriptions.Item label="Status">{movie.status}</Descriptions.Item> */}
    //   <Descriptions.Item >{movie.homepage}</Descriptions.Item>
    //   <Descriptions.Item>{movie.popularity}</Descriptions.Item>
    //   <Descriptions.Item >{movie.vote_average}</Descriptions.Item>
    
    // </Descriptions>
    
    <div className="contain" >
  
      <div>
  <p class="alignright"> <h1> <b><font color="whitesmoke">   {movie.original_title}</font>   </b> </h1></p>
  <p class="alignleft"><h1><MDBBadge pill className=' text-dark' color='warning'>IMDB: {movie.vote_average}/10</MDBBadge></h1></p>
</div>



<div class="check">
    <div class="flex"><h5> <MDBBadge pill className=' text-light' color='secondary'>
          &nbsp;&nbsp; <b>MOVIE</b> &nbsp;&nbsp;
      </MDBBadge>    </h5>  </div>
    <div class="flex"> <h5>  <MDBBadge pill className=' text-light' color='success'>
          &nbsp;&nbsp;<b>REVENUE:{movie.budget!==0? (((movie.revenue)/1000000)).toFixed(2)+'M USD ': 'NOT KNOWN'}</b> &nbsp;&nbsp; 

      </MDBBadge></h5></div>
    <div class="flex"><h5>  <MDBBadge pill className=' text-light' color='primary'>
          &nbsp;&nbsp;<b>IN CINEMA: {movie.release_date} </b> &nbsp;&nbsp; 
      </MDBBadge></h5></div>
</div>



<div class="check">
    <div class="flex"> <h5>  <MDBBadge pill className=' text-dark' color='info'>
          &nbsp;&nbsp;<b>RUNTIME: {movie.runtime} minutes</b> &nbsp;&nbsp; 
      </MDBBadge></h5></div>
    <div class="flex"><h5>  <MDBBadge pill className=' text-light' color='danger'>
          &nbsp;&nbsp;<b>VOTE COUNT :{movie.vote_count}</b> &nbsp;&nbsp; 
      </MDBBadge></h5></div>
    <div class="flex">   <h5>  <MDBBadge pill className=' text-dark' color='warning'>
          &nbsp;&nbsp;<b>POPULARITY: {movie.popularity}</b> &nbsp;&nbsp; 
      </MDBBadge></h5></div>
</div>


<div class="check">
{setGenres.map(name => (
  
        
  
<div class="flex">   <h6>  <MDBBadge pill className=' text-light' color='secondary'>
          &nbsp;&nbsp;<b>    
          {name.name}</b> &nbsp;&nbsp; 
      </MDBBadge></h6></div>


))}

</div>












    

     </div>
  )
}

export default MovieInfo