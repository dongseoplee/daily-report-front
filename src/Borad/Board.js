import React, {useEffect, useState} from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./Board.scss";
import Comment from "../components/Comment";
import CommentInput from "../components/CommentInput";
import defaultImage from "../images/noimage.png"
import { jwtUtils } from "../Utils/jwtUtils";
import {Button, Dialog, DialogContent, IconButton} from "@mui/material";
import {useSelector} from "react-redux";


const Board = () => {
    //url 파라미터 받기
    const {board_id} = useParams();
    const [boardData, setBoardData] = useState([]);
    const [commentData, setCommentData] = useState([]);
    const token = useSelector(state => state.Auth.token);
    const [show, setShow] = useState(false);

    const navigate = useNavigate();
    console.log("token email", jwtUtils.getId(token));
    
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
          {
            jwtUtils.isAuth(token) && jwtUtils.getId(token) === boardData.email &&
            <div className="board-wrapper">
              <h1>{boardData.email} 작성자 로그인하였습니다.</h1>
              <div className="edit-delete-button">
              <Button
                variant="outlined"
                color="error"
                className="delete-button"
                onClick={() => setShow(true)} // show 상태 변수를 true로 업데이트
              >
                삭제
              </Button>
              </div>
            </div>
          }
          
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
          { show && (
          <Dialog open={true}>
          <DialogContent style={{ width: "4000px", minHeight: "200px" }}>
            <div>
              <div className="modal-title"> 정말 삭제하시겠습니까?</div>
              <Button
                  variant="outlined"
                  color="error"
                  onClick={async () => {
                    setShow(false);
                    console.log("삭제버튼 클릭함");
                    // 모달의 예 버튼 클릭시 게시물 삭제
                    try {
                      // await axios.delete(`/board/${board_id}`); // 이렇게 적으면 오류 발생 스프링의 주소가 아니기 때문
                      await axios.delete(`http://localhost:8080/board/${board_id}`);
                      // 삭제 요청이 성공하면 navigate("/")를 실행하여 페이지를 이동시킵니다.
                      navigate("/");
                      } catch (error) {
                      // 삭제 요청이 실패한 경우에 대한 예외 처리를 수행합니다.
                      console.error("게시물 삭제 실패:", error);
                      }
                  }}
                >
                  예
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={async () => {
                    setShow(false);
                  }}
                
                >
                아니오
                </Button>
            </div>
              <div className="modal-button">
              </div>
          </DialogContent>
        </Dialog>
          )}
          
        </React.Fragment>
        
    );
};

export default Board;