import React, {useEffect, useState} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Board.scss";
import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";
import defaultImage from "../images/noimage.png"

const Board = () => {
    //url 파라미터 받기
    const {board_id} = useParams();
    const [boardData, setBoardData] = useState([]);
    const [commentData, setCommentData] = useState([]);
    
    useEffect(() => {
        const fetchData = async() => {
            
            const response = await axios.get(`http://localhost:8080/board/${board_id}`)
            setBoardData(response.data[0]) //{}안의 내용만 boardData에 저장
            console.log("response data", response.data)

        }
        fetchData()
    }, []);

    useEffect(() => {
        console.log("boardData", boardData);
      }, [boardData]);

    useEffect(() => {
      const fetchCommentData = async() => {
        const responseComment = await axios.get(`http://localhost:8080/board/comment/${board_id}`)
        setCommentData(responseComment.data)
        console.log("response data comment", responseComment.data)
      }
      fetchCommentData()
    }, []);

    useEffect(() => {
      console.log("comment data", commentData)
    }, [commentData])

    return (
        <React.Fragment>
        <div className="board-header">
            <div className="board-header-username">{boardData.email}</div>
            <div className="board-header-date">{boardData.yyyymmdd}</div>
        </div>
        <hr/>
          <div className="board-body">
            <div className="board-image">
              {/* <img src={"https://source.unsplash.com/random/300x300/?korea"}/> */}
              {
                boardData.image != "null" ? (
                  <img src={boardData.image} width={600} height={300} />
                ) : (
                  <img src={defaultImage} width={600} height={350} />

              )}
          </div>
          <div className="board-title-content">
            <div className="board-title">{boardData.title}</div>
            <div className="board-content">{boardData.content}</div>
          </div>
        </div>
        <hr/>

          <div>
            <CommentInput board_id={boardData.id}/>
          </div>
          <div>
            {commentData.map((item) => (
              <Comment key={item.id} 
                board_id={item.board_id}
                username={item.username}
                yyyymmdd={item.yyyymmdd}
                content={item.content}
                email={item.email}
              />

            ))}
          </div>
          
        </React.Fragment>
        
    );
};

export default Board;