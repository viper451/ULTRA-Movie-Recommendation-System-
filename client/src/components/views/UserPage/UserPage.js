import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { CSSTransition } from 'react-transition-group';
import { Card, Avatar, Col, Row, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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
             console.log('User',response.data)
            if (response.data.success) {
                // console.log('response.data.comments', response.data.comments)
                setUser(response.data)
                console.log(setUser)
            } else {
                alert('Failed to get User Info')
            }
        })
        
    }

     const fetchFavoredMovie = () => {
        axios.post('/api/favorite/numFavoredMovie',variable )
            .then(response => {
                if (response.data.success) {
                     console.log('favourites',response.data)
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
             console.log('comments',response.data)
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
             console.log('getLikes', response.data)

            if (response.data.success) {
                // n of comment likes 
                setLikes(response.data.likes.length)
              

                
              
            } else {
                alert('Failed to get likes')
            }
        })

    }

    const fetchDislikes=()=>{
        axios.post('/api/like/numDislikes',variable )
        .then(response => {
            console.log('getDisLikes', response.data)

            if (response.data.success) {
           
                // n of comment likes 
                setDisLikes(response.data.likes)
                console.log(setDisLikes)

              
            } else {
                alert('Failed to get dislikes')
            }
        })
    }
// console.log(UserList)



    // const renderCards = UserList.map((user, index) => {
    //     return <Col lg={6} md={8} xs={24} key={user._id}>
    //         <Card
    //             hoverable
    //             style={{ width: 240, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    //             cover={<Avatar src={user.image} size={84} />}
    //         >
    //             <Meta title={user.name} />
    //             <br />
    //             <span>{user.firstName} {user.lastName}</span>
    //         </Card>
    //     </Col>
    // })
    console.log({Users}+" ewf")
     return (
        <CSSTransition
        in={true}
        appear={true}
        timeout={600}
        classNames='fade'
        unmountOnExit>
        <div>
        {Users && (
                <div>
                    <div className='container rounded p-4 mt-4 text-white'>
                        <div className='d-flex flex-column w-50 justify-content-between mr-4'>
                            <div className='d-flex m-1'>
                                <h4 className='w-20 m-0'>
                                    <span className='badge badge-primary mr-3'>
                                        Name
                                    </span>
                                </h4>
                                {/* <h3 className='m-0'>{Users[0].name}</h3> */}
                            </div>
                            <div className='d-flex m-1'>
                                <h4 className='w-20 m-0'>
                                    <span className='badge badge-primary mr-3'>
                                        @
                                    </span>
                                </h4>
                                {/* <h3 className='m-0'>{user.name}</h3> */}
                            </div>

                            <br />
                            <div className='d-flex m-1'>
                               
                         
                            </div>
                            <div className='d-flex m-1'>
                                <h5 className='w-20 m-0'>
                                    <span className='badge badge-warning p-2 mr-3'>
                                        Joined
                                    </span>
                                </h5>
                                <h5>
                                    <span className='badge badge-secondary p-2 mr-3'>
                                        {new Date(
                                            user.DateCreated
                                        ).toLocaleString()}
                                    </span>
                                </h5>
                            </div>
                        </div>
                    </div>
                    {/* <div className='container bg-transparent d-flex flex-column align-items-center mt-4 p-0'>
                        {reviews && reviews.length > 0 && (
                            <h2 className='text-warning d-flex align-content-center'>
                                <span>Reviews Given</span>

                                <span className='badge badge-pill badge-warning ml-3'>
                                    {reviews.length}
                                </span>
                            </h2>
                        )}
                        <br />
                        <div className='w-100'>
                            {reviews &&
                                reviews.map(function (rating, i) {
                                    return <Review review={rating} />;
                                })}
                        </div>
                    </div> */}
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
                </div>
             )}
        </div>
    </CSSTransition>
       
    )
   
}

export default UsersPage