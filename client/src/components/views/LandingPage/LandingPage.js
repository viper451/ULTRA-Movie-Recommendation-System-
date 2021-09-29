import React, { useEffect, useState, useRef } from 'react'
import { Typography, Row, Button,Divider } from 'antd';
import { API_URL, API_KEY, IMAGE_BASE_URL, IMAGE_SIZE, POSTER_SIZE } from '../../Config';
import { useTranslation } from 'react-i18next';
import SearchBar from '../MovieDetail/Sections/SearchBar'
import Spinner from '../MovieDetail/Sections/Spinner'
import { Link } from 'react-router-dom';
import MainImage from './Sections/MainImage'
import { MDBBadge } from 'mdb-react-ui-kit';
import GridCard from '../../commons/GridCards'
import { useFetchMovies } from '../MovieDetail/Sections/hooks/useFetchMovies'
const { Title } = Typography;


function LandingPage() {
    const date = new Date();
    const [
        { item: { Movies, CurrentPage},
            
            year,
            sort,
        
            yearRange,
            genreID,
        
        },
        fetchMovies,
      
        // handleGenre,
      
    ] = useFetchMovies()
    const buttonRef = useRef(null);
    const { t } = useTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [Loading, setLoading] = useState(true)
    const [dummy,setDummy] =useState()


    const onHorrorGenre = () => {
        let endpoint= ''
        setLoading(true)
        endpoint= `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=27`;
        fetchMovies(endpoint)
    }









    
    

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
       
        // const check=`${API_URL}discover/movie?api_key=${API_KEY}&with_genres=28`;
       
        fetchMovies(endpoint)

    }, [])

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
    }, [])


    // const fetchMovies = (endpoint) => {

    //     fetch(endpoint)
    //         .then(result => result.json())
    //         .then(result => {
    //             // console.log(result)
    //             // console.log('Movies',...Movies)
    //             // console.log('result',...result.results)
    //             setMovies([...Movies, ...result.results])
    //             setMainMovieImage(MainMovieImage || result.results[0])
    //             setCurrentPage(result.page)
    //         }, setLoading(false))
    //         .catch(error => console.error('Error:', error)
    //         )
    // }

    const loadMoreItems = () => {
        let endpoint = '';
        setLoading(true)
        console.log('CurrentPage', CurrentPage)
        endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    }

    const searchMovies = search => {
        const endpoint = search ? `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=` + search : `${API_URL}discover/movie?api_key=${API_KEY}&language==en-US&query&vote_count.gte=2500&sort_by=${sort}&primary_release_year=${year}&primary_release_date.gte=${yearRange.min}-01-01&primary_release_date.lte=${yearRange.max === date.getFullYear() ? convertDate(date) : yearRange.max + '-12-31'}&with_genres=${genreID}`
        setSearchTerm(search)
        fetchMovies(endpoint)
    }
    const handleGenre = (genreID) => {
      //  const endpoint = `${API_URL}discover/movie?api_key=${API_KEY}&with_genres=${genreID}`;
  
      const endpoint=`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreID}`;
        fetchMovies(endpoint)
        console.log(endpoint)
            
    }



    const handleScroll = () => {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight - 1) {

            // loadMoreItems()
            console.log('clicked')
            // buttonRef.current.click();
        }
    }

    function convertDate(date) {
        const yyyy = date.getFullYear().toString();
        const mm = (date.getMonth() + 1).toString();
        const dd = date.getDate().toString();

        const mmChars = mm.split('');
        const ddChars = dd.split('');

        return yyyy + '-' + (mmChars[1] ? mm : "0" + mmChars[0]) + '-' + (ddChars[1] ? dd : "0" + ddChars[0]);
    }

    const genres = [
        { id: 28, name: t('Action') },
        { id: 12, name: t('Adventure') },
        { id: 16, name: t('Animation') },
        { id: 35, name: t('Comedy') },
        { id: 80, name: t('Crime') },
        { id: 99, name: t('Documentary') },
        { id: 18, name: t('Drama') },
        { id: 10751, name: t('Family') },
        { id: 14, name: t('Fantasy') },
        { id: 36, name: t('History') },
        { id: 27, name: t('Horror') },
        { id: 10402, name: t('Music') },
        { id: 9648, name: t('Mystery') },
        { id: 10749, name: t('Romance') },
        { id: 878, name: t('Sci-Fi') },
        { id: 10770, name: t('TV-Movie') },
        { id: 53, name: t('Thriller') },
        { id: 10752, name: t('War') },
        { id: 37, name: t('Western') },
    ];





    return (
        <div style={{ width: '100%', margin: '0' }}>
            {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                />

            }

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <Title level={2} > <font color="white">Latest movies</font> </Title>
                <hr />
                <SearchBar callback={searchMovies} />
                <Divider>Genres</Divider>
                    <div style={{ textAlign: 'center' }}>
                        {genres.map(
                            genre =>
                                <Button
                                    key={genre.name}
                                    shape="round"
                                    type="primary"   
                                    size="small"
                                    onClick={() => handleGenre(genre.id)}
                                    value={genre.id}
                                    style={{ borderColor: "#19ba90", textAlign: "center", fontSize: "0.9em", margin: "1px" }}
                                >{genre.name}
                                </Button>
                            
                        )}
                    </div>
                  
                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCard
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                    : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                                movieDate={movie.release_date}
                                movieRating={movie.vote_average}
                                movieGenre={movie.genre_ids &&
                                    movie.genre_ids.length &&
                                    movie.genre_ids.map(genreID => (
                                        <span key={genreID}>
                                            {genres.map(
                                                genre =>
                                                    genreID === genre.id && (
                                                     
                                                            <MDBBadge  pill className=' text-dark' color='warning'
                                                              
                                                                // shape="round"
                                                                // size="small"
                                                                // onClick={() => handleGenre(genre.id)}
                                                                style={{ borderColor: "#19ba90", textAlign: "center", fontSize: "15px", margin: "4px" }}
                                                            >{genre.name}
                                                            </MDBBadge>
                                                      
                                                    )
                                            )}
                                        </span>
                                    )).slice(0, 7)}

                            />
                        
                        </React.Fragment>
                    ))}
                </Row>

                {Loading &&
                    <div>Loading...</div>}

                <br />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button ref={buttonRef} className="loadMore" onClick={loadMoreItems}>Load More</button>
                </div>
            </div>

        </div>
    )
}

export default LandingPage