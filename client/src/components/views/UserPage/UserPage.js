import React, { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { MDBBadge } from 'mdb-react-ui-kit';
import { Card, Avatar, Col, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import GridCards from '../../commons/GridCards';
import "./UserPage.css";
const { Title } = Typography;
const { Meta } = Card;

function UsersPage() {
    const user = useSelector(state => state.user)
 //   console.log(user)
 
    let variable = { userFrom: localStorage.getItem('userId') }
    const { t } = useTranslation();
    const [Comments,setComments]=useState([])
    const [Users,setUser]=useState([])
    const [Likes,setLikes]=useState([])
    const [Dislikes,setDisLikes]=useState([])
    const [Favorite,setFavorite]=useState([])
    const [UserList, setUserList] = useState([])
    const [Loading, setLoading] = useState(true)
    const history = useHistory();
    const reviewmovie=(postId)=>{
        history.push(`/movie/${postId}`)
        
          }
        
    useEffect(() => {
        fetchUserProfile()
        fetchFavoredMovie()
        fetchComments()
        fetchLikes()
        fetchDislikes()
      
    }, [history])

    const fetchUserProfile=()=>{

        axios.post('/api/users/numUser',variable )
        .then(response => {
             console.log('User',response.data.users)
            if (response.data.success) {
                // console.log('response.data.comments', response.data.comments)
                setUser(response.data.users)
              
            } else {
                alert('Failed to get User Info')
            }
        })
        
    }


     const fetchFavoredMovie = () => {
        axios.post('/api/favorite/numFavoredMovie',variable )
            .then(response => {
                if (response.data.success) {
                      console.log('favourites',response.data.favorites)
                    setFavorite(response.data.favorites)
                    // console.log(setFavorite)
                    setLoading(false)
                } else {
                    alert('Failed to get favored movie')
                }
            })
    }

    const fetchComments=()=>{

        axios.post('/api/comment/numComments',variable )
        .then(response => {
              console.log('comments',response.data.comments)
            
            if (response.data.success) {
                // console.log('response.data.comments', response.data.comments)
                setComments(response.data.comments)
              
            } else {
                alert('Failed to get comments Info')
            }
        })
        
    }


    const fetchLikes=()=>{
        axios.post('/api/like/numLikes',variable )
        .then(response => {
             console.log('getLikes', response.data.likes)

            if (response.data.success) {
                // n of comment likes 
                // setLikes(response.data.likes.length)
                setLikes(response.data.likes)
              

                
              
            } else {
                alert('Failed to get likes')
            }
        })

    }

    const fetchDislikes=()=>{
        axios.post('/api/like/numDislikes',variable )
        .then(response => {
            console.log('getDisLikes', response.data.dislikes)
     

            if (response.data.success) {
           
                // n of comment likes 
                setDisLikes(response.data.dislikes)
             
                console.log(setDisLikes)

              
            } else {
                alert('Failed to get dislikes')
            }
        })
    }
//  console.log(Users[0]?.name)



    // const renderCards = Users.map((user) => {
    //     return <Col lg={6} md={8} xs={24} key={user._id}>
    //         <Card
    //             hoverable
    //             style={{ width: 240, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    //             cover={<Avatar src={user.image} size={84} />}
    //         >
    //             <Meta title={user.name} />
    //             <br />
    //             <span>{user[0].email} </span>
    //         </Card>
    //     </Col>
    // })
    
 
//  console.log(Comments[0]?.content)
     return (
        <CSSTransition
        in={true}
        appear={true}
        timeout={600}
        classNames='fade'
        unmountOnExit>
        
        <div>
           {/* {users.map((article,key)=>(
                   <div>{article.email} </div>
           ))} */}

        {Users && (
                <div>
              
                    <div className='container rounded p-4 mt-4 text-white'>
                        <div className='d-flex flex-column w-30 justify-content-between mr-4'>
                            <div className='d-flex m-1'  style={{ marginLeft: '.5rem' }}>
                                <h4 className='w-20 m-0'>
                                    <span className='badge badge-primary mr-3'>
                                    <MDBBadge pill className=' text-light' color='primary'>
                                        Name  </MDBBadge>
                                    </span>
                                </h4>
                                
                                <h3 className='m-0'>
                                    
                                <font color="white">:</font> &nbsp; &nbsp;&nbsp; &nbsp; <font color="white">{Users[0]?.name}</font></h3>
                                <div> 


                                    
                                </div>
                                
                         
                            </div>
                            <div className='d-flex m-1'>
                                <h4 className='w-20 m-0'>
                                    <span className='badge badge-primary mr-3'>
                                    <MDBBadge pill className=' text-light' color='primary'>
                                        @  </MDBBadge>
                                        &nbsp; &nbsp;
                             
                                       </span>
                                </h4>
                                <h3 className='m-0'>
                                    
                                <font color="white">:</font>  &nbsp; &nbsp;&nbsp; &nbsp; <font color="white">{Users[0]?.email}</font></h3>
                            </div>

                            <br />
                            <div className='d-flex m-1'>
                               
                         
                            </div>
                            <div className='d-flex m-1'>
                                <h5 className='w-20 m-0'>
                                    <span className='badge badge-warning p-2 mr-3'>
                                 <h3>   <MDBBadge pill className=' text-dark' color='warning'>
                                        Joined :</MDBBadge></h3>
                                   
                                    </span>
                                </h5>
                                <h5>
                                    <h3>
                                    <span className='badge badge-secondary p-2 mr-3'>
           &nbsp;   &nbsp;   &nbsp;    &nbsp;   &nbsp;
                                        {new Date(
                                            Users[0]?.DateCreated
                                        ).toLocaleString()}
                                    </span>
                                    </h3>
                                </h5>
                            </div>
                        </div>
                    </div>
                    <div>
                    <h2 className='text-warning d-flex align-content-center'>
                                <span style={{padding:'20px'}}>YOUR REVIEWS</span>
                           
                                <span style={{padding:'20px'}} className='badge badge-pill badge-warning ml-3'>
                                  <b>  {Comments.length}</b>
                                </span></h2>
                        
                        {Comments && Comments.length > 0 && (
                        
                            <h6>
                                {/* <span style={{padding:'20px'}}>YOUR REVIEWS</span>
                           
                                <span style={{padding:'20px'}} className='badge badge-pill badge-warning ml-3'>
                                    {Comments.length}
                                </span> */}
                                <br/>
                                <br/>
                                <span className='badge badge-pill badge-warning ml-3'>
                                <br/>
                                {/* <Button variant="outline-dark"><a onClick={logoutHandler}><font color="white">LOG OUT</font></a></Button> */}
                             
                                    {Comments.map((comment) => (
                                     
                                     <div>
                                     {/* <div id="inner1">This is inner div 1</div>
                                     <div id="inner2">This is inner div 2</div> */}
                                
                                        <Button variant="outline-dark" style={{width: 'max-content',margin:'3px',padding:'30px'}}  onClick={() => reviewmovie(comment.postId)}>
                                            <div style={{width:'100%',margin:'3px'}}><font color="white">Movie: {comment.moviename}</font></div>
                                            <div style={{width:'100%',margin:'3px'}}><font color="white">Review: {comment.content}</font></div>
                                            <div style={{width:'100%',margin:'3px'}}><font color="white">Date and Time: {new Date(
                                            comment.createdAt
                                        ).toLocaleString()}</font></div>
                                 
                                         
                                                                                </Button>
                                        
                                                                                </div>
                                    ))}
                                 
                              
                                </span>
                            </h6>
                        )}
                        <br />
                        {/* <div className='w-100'>
                            {reviews &&
                                reviews.map(function (rating, i) {
                                    return <Review review={rating} />;
                                })}
                        </div> */}
                    </div>
                    <div>
                   {/* {Comments.map((user, index)=>{
  
  <div><font color="white">{user[index]?.content}</font></div>
})}; */}
                         </div>
                    {/* <div className='mt-5'>
                        {likedQuery && (
                            <MovieRow
                                key={'Liked'}
                                title={'Liked List'}
                                shouldCount='true'
                                movies={likedQuery}></MovieRow>
                        )}
                        {savedQuery && (
                            <MovieRow
                                key={'Saved for Later'}
                                title={'Saved for Later'}
                                shouldCount='true'
                                movies={savedQuery}></MovieRow>
                        )}
                    </div> */}

{/* COMMENTS GIVEN */}
<div className='container bg-transparent d-flex flex-column align-items-left  p-0'>
                        {Favorite && Favorite.length > 0 && (
                            <h2 className='text-warning d-flex align-content-left'>
                                <span>YOUR FAVORITES</span>

                                <span className='badge badge-pill badge-warning ml-3'>
                                    {Favorite.length}
                                </span>
                            </h2>
                        )}
                        <br />
                        {/* <div className='w-100'>
                            {reviews &&
                                reviews.map(function (rating, i) {
                                    return <Review review={rating} />;
                                })}
                        </div> */}
                        <span className='badge badge-pill badge-warning ml-3'>
                         <Fragment>
                                    {Favorite.map((favourite) => (
                                        <div>

<div>
                                     {/* <div id="inner1">This is inner div 1</div>
                                     <div id="inner2">This is inner div 2</div> */}
                                
                                        <Button variant="outline-dark" style={{width: 'max-content',margin:'3px',padding:'30px'}}  onClick={() => reviewmovie(favourite.movieId)}>
                                            <div style={{width:'100%',margin:'3px'}}><font color="white">Movie: {favourite.movieTitle}</font></div>
                                            <div style={{width:'100%',margin:'3px'}}><font color="white">Runtime: {favourite.movieRunTime} minutes</font></div>
                                            <div style={{width:'100%',margin:'3px'}}><font color="white">Date and Time: {new Date(
                                            favourite.createdAt
                                        ).toLocaleString()}</font></div>
                                 
                                         
                                                                                </Button>
                                        
                                                                                </div>




                                          
                                            {/* <div>Movie: {favourite.movieTitle}</div> */}
                                            <br />
                                        </div>
                                        
                                        
                                    ))}

                                </Fragment>
                                </span>
                    </div>








{/* LIKES GIVEN */}
<div className='container bg-transparent d-flex flex-column align-items-center mt-4 p-0'>
                        {Likes && Likes.length > 0 && (
                            <h2 className='text-warning d-flex align-content-center'>
                                <span>LIKES</span>

                                <span className='badge badge-pill badge-warning ml-3'>
                                    {Likes.length}
                                </span>
                            </h2>
                        )}
                        <br />
                     
                    </div>










{/* DISLIKES GIVEN */}

                     <div className='container bg-transparent d-flex flex-column align-items-center mt-4 p-0'>
                        {Dislikes && Dislikes.length > 0 && (
                            <h2 className='text-warning d-flex align-content-center'>
                                <span>DISLIKES</span>

                                <span className='badge badge-pill badge-warning ml-3'>
                                    {Dislikes.length}
                                </span>
                            </h2>
                        )}
                        <br />
                     
                    </div>









                </div>
             )}
        </div>
    </CSSTransition>
       
    )
   
}

export default UsersPage