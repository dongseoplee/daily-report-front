import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import "./Comment.scss";
import { Button } from "@mui/material";
import { TextField, Dialog, DialogContent } from "@mui/material";
import {useSelector} from "react-redux";
import { jwtUtils } from "../Utils/jwtUtils";
import { useNavigate, useParams } from "react-router-dom";
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';



const Comment = ({id, board_id, username, content, yyyymmdd, email}) => { //{} 를 싸줘야 함 그래야 {}로 넘어오는 데이터 처리 가능

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
    const token = useSelector(state => state.Auth.token);
    const [show, setShow] = useState(false);
    const [commentShow, setCommentShow] = useState(false);
    const [newContent, setNewContent] = useState("");

    const navigate = useNavigate();
    const edit = useCallback(async () => {
      const formData = new FormData();
      formData.append("board_id", board_id);
      formData.append("content", newContent);
      formData.append("email", email);
      console.log("formdata", formData);
      await axios.put(`http://localhost:8080/edit-comment/${id}`, formData);
      window.location.reload();

    }, [board_id, newContent]);




    return (
        <React.Fragment>

        <div className="comments-wrapper">
        <div className="comments-body">
            
            <div className="comments-comment">
                <div className="comment-username-date"></div>
                <div className="comment-date">{yyyymmdd}</div>
            </div>
            <div className="delete-edit-button">
                {
                    jwtUtils.isAuth(token) && jwtUtils.getId(token) === email &&
                    <div>
                    <Button
                    variant="outlined"
                    color="error"
                    className="delete-button"
                    onClick={() => setShow(true)} // show 상태 변수를 true로 업데이트

                    >
                    삭제
                    </Button>

                    <Button
                    variant="outlined" endIcon={<BuildOutlinedIcon/>}
                    onClick={() => {
                      console.log("수정 버튼 클릭")
                      setCommentShow(true)
                      // navigate(`/edit-board/${board_id}`)
                    }}
                  >
                    수정
                  </Button>
                  </div>
                    
                    
                }
                
            </div>
            <div className="comment-username">{email}</div>
            <div className="comment-content">{content}</div>
            <hr/>
        </div>
        </div>
        {
            show && (
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
                      // 삭제 요청이 성공하면 navigate("/")를 실행하여 페이지를 이동시킵니다.
                      console.log("comment key", id);
                      await axios.delete(`http://localhost:8080/comment/${id}`);
                      window.location.reload();
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

            )
        }
        {
          //댓글 수정 모달 창
          commentShow && (
            <Dialog open={true}>
                <DialogContent style={{ width: "4000px", minHeight: "200px" }}>
                <div>
                <div className="modal-title">수정하시겠습니까?</div>
                <div className="CommentInput-header">
                <TextField
                className="CommentInput-header-textarea"
                maxRows={3}
                onChange={(e) => {
                    setNewContent(e.target.value)
                }}
                multiline placeholder="댓글을 입력해주세요"
                />
                {newContent !== "" ? (
                <Button variant="outlined" onClick={edit}>등록하기</Button>
                // <Button variant="outlined" >등록하기</Button>
                ) : (
                <Button variant="outlined" disabled={true}>
                    등록하기
                </Button>
                )}
              </div>
                
                <Button
                  variant="outlined"
                  color="error"
                  onClick={async () => {
                    setCommentShow(false);
                  }}
                
                >
                아니오
                </Button>
                </div>
                <div className="modal-button">
                </div>
                </DialogContent>
                </Dialog>
          )
        }
        
        </React.Fragment>
          
           
    );

};

export default Comment;