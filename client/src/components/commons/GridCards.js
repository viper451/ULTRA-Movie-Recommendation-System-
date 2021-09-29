import React from 'react'
import { CSSTransition } from 'react-transition-group';
import { Col } from 'antd';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import { MDBBadge } from 'mdb-react-ui-kit';
import Button from "react-bootstrap/Button";
import { IMAGE_BASE_URL } from '../Config';

function GridCards(props) {

    let { actor, key, image,actorName, charName, movieId, movieName, characterName,movieRating,movieDate,movieGenre } = props

    const POSTER_SIZE = "w154";

    if (actor !== undefined) {
        return (
        //     <Col key={key} lg={6} md={8} xs={24}>
        //     <div style={{ position: 'relative' }}>
        //         <img style={{ width: '40%', height: '50%' }} alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />
              
        //     </div>
        // </Col>
           <Col lg={4} md={6} xs={24}>
           <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
               <Card
                   hoverable
                   style={{ width: '100%' }}
                   alt={movieName}  
               >
                     <div style={{ position: 'relative' }}>
                <img style={{ width: '100%', height: '100%' }} alt={characterName} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${image}`} />
              
            </div>
                   <h3 style={{ textAlign: "center", fontWeight: "bold",color:"white" }}>{actorName}</h3>
                   <h5 style={{ textAlign: "center", fontWeight: "bold",color:"white" }}>{charName}</h5>
               </Card>
           </div>
       </Col>

        )
    } else {
        return (
            <CSSTransition
            in={true}
            appear={true}
            timeout={600}
            classNames="fade"
            unmountOnExit
        >

        <div className="movie-card" >
        <a href={`/movie/${movieId}`} >
        <Card text="white">

                            <Card.Img variant="top" src={image} alt={movieName}  />

          <div className="poster-title">{movieName}</div>
          <div className="container">
              <div class="row">
              <div class="genres">
     <h5>{movieGenre} </h5></div>




                  <div class="column">
        <h5>  <MDBBadge pill className='mx-2 text-light' color='danger'>
          &nbsp;&nbsp; <b>{movieRating}</b> &nbsp;&nbsp;
      </MDBBadge></h5></div>
      <div class="column">
      <h5>  <MDBBadge pill className='mx-2' color='success'>
          &nbsp;&nbsp; <b>{movieDate}</b> &nbsp;&nbsp; 
      </MDBBadge></h5></div>
      
     </div>
     </div>

            
          
        
            </Card>
            </a>
            </div>
              </CSSTransition> 
        )
    }

}

export default GridCards