import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import "./Comment.scss";
import { Button } from "@mui/material";
import { TextField } from "@mui/material";

const Comment = ({board_id, username, content, yyyymmdd, email}) => { //{} 를 싸줘야 함 그래야 {}로 넘어오는 데이터 처리 가능

    // const [commentData, setCommentData] = useState([]);
    // // const [commentList, setCommentList] = useState([]);

    // useEffect(() => {
    //   const fetchCommentData = async() => {
    //     const responseComment = await axios.get(`http://localhost:8080/board/comment/${board_id}`)
    //     setCommentData(responseComment.data[0])
    //     console.log("response data comment", responseComment.data)
    //   }
    //   fetchCommentData()
    // }, []);

    return (
        <div className="comments-wrapper">
        <div className="comments-body">
            
            <div className="comments-comment">
                <div className="comment-username-date"></div>
                <div className="comment-date">{yyyymmdd}</div>
            </div>
            <div className="comment-username">{email}</div>
            <div className="comment-content">{content}</div>
            <hr/>
        </div>
        </div>
          
           
    );

};

export default Comment;