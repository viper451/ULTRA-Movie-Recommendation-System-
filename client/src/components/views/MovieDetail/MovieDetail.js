import React, { useEffect, useState } from 'react'
import { Row, Button } from 'antd';
import axios from 'axios';
import YouTubeIcon from "@material-ui/icons/YouTube";
import Comments from './Sections/Comments';
import "../../../../src/App.scss";
import "../MovieDetail/MovieDetail.css";
import background from '../../../assets/background.png';
import LikeDislikes from './Sections/LikeDislikes';
import {Icon} from 'antd';
import Spinner from './Sections/Spinner';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE } from '../../Config'
import GridCards from '../../commons/GridCards';
import MainImage from '../../views/LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';
import Footer from '../Footer/Footer';
import RecommendedMovies from './Sections/Recommended';
import SimilarMovies from './Sections/Similar';

function MovieDetailPage(props) {

    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [Directors, setDirectors] = useState([])
    const [video, setVideo] = useState();
    const [CommentLists, setCommentLists] = useState([])
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
    const [ActorToggle, setActorToggle] = useState(false)
    const movieVariable = {
        movieId: movieId,
        video:video
    }

    useEffect(() => {
        fetchVideo();
        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo)

        axios.post('/api/comment/getComments', movieVariable)
            .then(response => {
                // console.log(response)
                if (response.data.success) {
                    // console.log('response.data.comments', response.data.comments)
                    setCommentLists(response.data.comments)
                } else {
                    alert('Failed to get comments Info')
                }
            })

    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    const fetchVideo = async () => {
        const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`
        );
        setVideo(data.results[0]?.key);
        console.log(data.results[0]?.key +"  axndow");
    };
    



    const fetchDetailInfo = (endpoint) => {

        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                // console.log(result)
                setMovie(result)
                setLoadingForMovie(false)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        // console.log(result)
                        setCasts(result.cast)
                    })

                setLoadingForCasts(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }

    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment))
    }

    return (
        <div class=".bg_image">


            {/* Header */}
            {!LoadingForMovie ?
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}
                />
                :
                <div>loading...</div>
            }


            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}  className='background-default'>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Favorite movieInfo={Movie} movieId={movieId} userFrom={localStorage.getItem('userId')} />
                </div>


                {/* Movie Info */}
              
                {!LoadingForMovie ?
                    <MovieInfo movie={Movie} />
                    :
                    <div>loading...</div>
                }

                <br />
                {/* Actors Grid*/}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem',backgroundImage: `url(${background})` }}>
                    <Button style={{ color: '#BD0A28', borderColor: '#BD0A28' }} onClick={toggleActorView}>Toggle Actor View </Button>
                </div>

                {/* {ActorToggle &&
                    <Row gutter={[16, 16]}>
                        {
                            !LoadingForCasts ? Casts.map((cast) => (
                                cast.profile_path &&
                                <GridCards actor image={cast.profile_path} characterName={cast.characterName} />
                            )) :
                                <div>loading...</div>
                        }
                    </Row>
                } */}

{ActorToggle &&
                            <Row gutter={[16, 16]}>
                                {
                                    !LoadingForCasts ? Casts.map((cast, index) => (
                                        cast.profile_path &&
                                        <React.Fragment key={cast.id}>
                                            <GridCards actor image={cast.profile_path} actorName={cast.name} charName={cast.character} />
                                        </React.Fragment>
                                    )) :
                                        <div><Spinner /></div>
                                }
                            </Row>
                        }



                <br />

                <div style={{ display: 'flex', justifyContent: 'center'     ,  backgroundImage: `url(${background})`,}}>
                    <LikeDislikes movie movieId={movieId} userId={localStorage.getItem('userId')} />
                </div>

                {/* Comments */}
               
                <Comments movieTitle={Movie.original_title} CommentLists={CommentLists} postId={movieId} refreshFunction={updateComment} />

            </div>

            <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                   WATCH THE CLIP
                  </Button>
                  
                            <div><RecommendedMovies type="Recommended Movies" urlParams={movieId} /></div>
                            :
                            null
                        
                        {/* <br /> */}
                        {/* Similar Movies */}
                        
                            <div><SimilarMovies type="Similar Movies" urlParams={movieId} /></div>
                            
                            null
                        
                 <Footer />


             
        </div>//MAIN DIV??
    )
}

export default MovieDetailPage

