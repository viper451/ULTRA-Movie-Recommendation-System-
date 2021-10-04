import React, { useState } from 'react'
import { Button, Input, Typography, } from 'antd';
import axios from 'axios';
import '../../../../../src/App.scss'
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import './Comment.css';
import ReplyComment from './ReplyComment';
import background from '../../../../../src/assets/background.png';

const { TextArea } = Input;
const { Title } = Typography;
function Comments(props) {
    const mystyle = {
        color: "black",
       fontSize:"30px",
        padding: "10px",
        
    fontFamily: "Arial"
      };

    const user = useSelector(state => state.user)
    const [Comment, setComment] = useState("")
    const [reviews, setReviews] = useState([]); // reviews

 
    const [reviewScore, setReviewScore] = useState('0');
  

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (user.userData && !user.userData.isAuth) {
            return alert('Please Log in first');
        }

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId,
            review:props.review
        }
         console.log(variables)

        axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    setComment("")
                    setReviews([]);
                    props.refreshFunction(response.data.result)
                } else {
                    alert('Empty content not accepted')
                }
            })
    }

    return (
        <div   style={{
            backgroundColor: 'black',
           
          }}>
            <br />
            <div className="commentscheck">
            <Title level={3} ><font color="white"> Share your opinions about {props.movieTitle}</font> </Title>
            <hr />
            {/* Comment Lists  */}
            {console.log(props.CommentLists)}
            
            {props.CommentLists && props.CommentLists.map((comment, index) => (
                (!comment.responseTo &&
                 
                    <React.Fragment>
                     <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} review={reviewScore} />
                        <ReplyComment CommentLists={props.CommentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}
</div>
            {props.CommentLists && props.CommentLists.length === 0 &&
                <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px'}} >
                <b style={mystyle}><font color="white">   NO REVIEWS</font></b>
                </div>
            }

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                
                />
                <br />
         
                <span  >
                <Button   className='btn btn-outline-info' style={{ width: '100%', height: '52px' }} onClick={onSubmit}>SEND</Button>
                {/* <button type="button" class="btn btn-outline-info">Info</button> */}
                </span>
            </form>

        </div>
    )
}

export default Comments
