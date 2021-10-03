import React from 'react';
import { API_KEY,IMAGE_BASE_URL, POSTER_SIZE} from '../../../Config'
import { withTranslation } from 'react-i18next';
import { createFromIconfontCN } from '@ant-design/icons';
import { Typography, Row } from 'antd';
import GridCard from '../../../commons/GridCards'


const { Title } = Typography;

const MovieIcon = createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_1804216_cpuj79al49d.js',
});
// const genres = [
//     { id: 28, name: t('Action') },
//     { id: 12, name: t('Adventure') },
//     { id: 16, name: t('Animation') },
//     { id: 35, name: t('Comedy') },
//     { id: 80, name: t('Crime') },
//     { id: 99, name: t('Documentary') },
//     { id: 18, name: t('Drama') },
//     { id: 10751, name: t('Family') },
//     { id: 14, name: t('Fantasy') },
//     { id: 36, name: t('History') },
//     { id: 27, name: t('Horror') },
//     { id: 10402, name: t('Music') },
//     { id: 9648, name: t('Mystery') },
//     { id: 10749, name: t('Romance') },
//     { id: 878, name: t('Sci-Fi') },
//     { id: 10770, name: t('TV-Movie') },
//     { id: 53, name: t('Thriller') },
//     { id: 10752, name: t('War') },
//     { id: 37, name: t('Western') },
// ];


class RecommendedMovies extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data: ''
        }

        if (props.type === 'Recommended Movies') {
            fetch('https://api.themoviedb.org/3/movie/' + this.props.urlParams + '/recommendations?api_key=' + API_KEY + '&language=en-US')
                .then(res => res.json())
                .then(res => {
                    this.setState({ data: res.results });
                })
                .catch(error => console.error('Error:', error))
        }
    }

    render() {
        const { t } = this.props
        // if (!this.state.data) return "";
        if (this.state.data === '') return ('');
        else {
            let data_arr = [];
            for (let i in this.state.data.slice(0, 10)) {
                if (this.state.data[i].vote_count > 2300 && this.state.data[i].backdrop_path !== null && this.state.data[i].overview !== null)
                          <h1>RECOMMENDED MOVIES</h1>
                    data_arr.push(
                        <React.Fragment key={i}>
                        <GridCard movie
                        className="similar_movies"
                            image={ this.state.data[i].poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${ this.state.data[i].poster_path}` : t('landing.notAvail')}
                            movieId={ this.state.data[i].id}
                            movieName={ this.state.data[i].title}
                            date={ this.state.data[i].release_date}
                            vote={ this.state.data[i].vote_average ?  this.state.data[i].vote_average : 'N/A'}
                            movieDate={ this.state.data[i].release_date}
                            movieRating={ this.state.data[i].vote_average ?  this.state.data[i].vote_average : 'N/A'}
                        />
                        </React.Fragment>
                    )
            }

            return (
                <div>
                    <Title level={3}><MovieIcon type="icon-movie" style={{ fontSize: "35px", paddingRight: "10px" }} /><h1><font color="gold">RECOMMENDED MOVIES</font></h1></Title>
                    <hr />
                    <br />
                    <Row gutter={[16, 16]}>
                        {this.state.data.length === 0 ? 
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100px' }}>
                            {t("movie.recoNone")}
                            </div> : data_arr}
                    </Row>
                </div>
            )
        }
    }
}

export default withTranslation()(RecommendedMovies);