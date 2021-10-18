import React, { useEffect, useState } from 'react'
import { Typography, Popover } from 'antd';
import axios from 'axios';
import './favorite.css';
import { useSelector } from 'react-redux';
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../Config'
import { useHistory } from 'react-router-dom';
const { Title } = Typography;

function FavoritePage(props) {
    const user = useSelector(state => state.user)
    const history = useHistory();
    const [Favorites, setFavorites] = useState([])
    const [Loading, setLoading] = useState(true)
    let variable = { userFrom: localStorage.getItem('userId') }

    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        axios.post('/api/favorite/getFavoredMovie', variable)
            .then(response => {
                if (response.data.success) {
                    //  console.log(response.data)
                    setFavorites(response.data.favorites)
                    setLoading(false)
                } else {
                    alert('Failed to get favored movie')
                }
            })
    }
  //  console.log(Favorites)

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId: movieId,
            userFrom: userFrom,
        }

        axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert('Failed to Remove From Favorites')
                }
            })
    }
    function movieDetail(movieId){
        history.push(`/movie/${movieId}`);
    }


    const renderCards = Favorites.map((favorite, index) => {


        const content = (
            <div>
                {favorite.moviePost ?
                    <img onClick={() => movieDetail(favorite.movieId)} src={`${IMAGE_BASE_URL}${POSTER_SIZE}${favorite.moviePost}`} />
                    : "no image available"}
            </div>
        );

        return <tr key={index}>

            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>

            <td><font color="black">{favorite.movieRunTime} mins</font></td>
            <td><button style={{ alignItems: 'center' }} onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}> Remove </button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > MY FAVOURITES </Title>
            <hr />
            {user.userData && !user.userData.isAuth ?
                <div style={{ width: '100%', fontSize: '2rem', height: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <p><font color="white">Log in first...</font></p>
                    <a style={{ color: 'white' }} href="/login">Go to Login page</a>
                </div>
                :
                !Loading &&
                <table>
                    <thead>
                        <tr>
                            <th >Title</th>
                            <th>Duration</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {renderCards}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default FavoritePage