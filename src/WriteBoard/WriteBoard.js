import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {Button} from "@mui/material";
import TextArea from "../components/Textarea";
import ImageUploader from "../components/ImageUploader";
import { jwtUtils } from "../Utils/jwtUtils";
import { useSelector } from "react-redux";

const WriteBoard = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const token = useSelector(state => state.Auth.token);
    const email = jwtUtils.getId(token);

    const handleSubmit = useCallback(async () => {
        try {
            const formData = new FormData(); //FromData() 를 formData() 로 적은 실수를 함
            formData.append("title", title);
            formData.append("content", content);
            formData.append("image", image);
            formData.append("email", email);
            console.log("image123123", image);
            console.log("form data", formData);

            const response = await axios.post("http://localhost:8080/board", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("api post success");
            navigate("/");
        } catch (error) {
            console.log("api post fail");

        }

    }, [title, content, image]);

    return (
        <div className="addBoard-wrapper">
        <div className="addBoard-header">
            {/* 게시물 등록하기 🖊️ */}
        </div>
       
        <div className="addBoard-body">
            {/* <ImageUploader setImage={setImage} preview_URL={image.preview_URL}/> */}
            <ImageUploader setImage={setImage}/>
            <TextArea setTitle={setTitle} setContent={setContent} title={title} content={content}/>
        </div>
        <div className="submitButton">
                
                <Button
                    onClick={handleSubmit}
                    className="success-button"
                    variant="outlined"
                >
                    게시물 등록
                </Button>
                
                {/* <Button
                    className="disable-button"
                    variant="outlined"
                    size="large"
                >
                    사진과 내용을 모두 입력하세요😭
                </Button> */}
                
        </div>
        </div>
    );

};
export default WriteBoard;