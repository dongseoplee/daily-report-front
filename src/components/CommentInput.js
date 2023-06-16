import React, {useEffect, useState} from "react";
import { useCallback } from "react";
import {Button} from "@mui/material";
import { TextField } from "@mui/material";
import axios from "axios";
import './CommentInput.scss';
const CommentInput = ({board_id}) => {

    const [newContent, setNewContent] = useState("");

    const submit = useCallback(async () => {
        const formData = new FormData();
        formData.append("board_id", board_id);
        formData.append("content", newContent);
        
        console.log("comment", formData)
        await axios.post("http://localhost:8080/board/comment", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        window.location.reload();
    }, [board_id, newContent]); //board_id, newContent 둘다 선언하고 comment안에 넣어야함

    return (
        <div className="CommentInput-wrapper">
        <div className="CommentInput-header">
            <TextField
            className="CommentInput-header-textarea"
            maxRows={3}
            // onClick={isLogin}
            onChange={(e) => {
                setNewContent(e.target.value)
            }}
            multiline placeholder="댓글을 입력해주세요"
            />
            {newContent !== "" ? (
            <Button variant="outlined" onClick={submit}>등록하기</Button>
            ) : (
            <Button variant="outlined" disabled={true}>
                등록하기
            </Button>
            )}
        </div>
        </div>
    );
};

export default CommentInput;