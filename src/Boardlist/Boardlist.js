import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "../components/Card";
import "./Boardlist.scss";
const BoardList = () => {
    const [boardData, setBoardData] = useState([]);

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await axios.get('http://localhost:8080/board/')
                await setBoardData(response.data)
                await console.log("response data", response.data)

            } catch (error) {
                console.log('axios Error', error)
            }

        };
        fetchData()
    }, []);

    console.log("board data", boardData)
    return (
        <div className="boardList-wrapper">
        <div className="boardList-header">
        {/* 전체 게시물 📝 */}
        </div>
        <div className="boardList-body">
            {boardData.map((item) => (
            <Card key={item.id} username={item.username}
                    date={item.yyyymmdd}
                    title={item.title} content={item.content}
                    board_id={item.id} img_url={"https://source.unsplash.com/random/300x300/?korea"}
            />
            ))}
        </div>
      </div>


    );

};

export default BoardList;