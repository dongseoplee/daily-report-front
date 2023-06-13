import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Card from "../components/Card";
import "./Boardlist.scss";
import { Pagination } from "@mui/material"; // mui Pagination 사용
const BoardList = () => {
    const [boardData, setBoardData] = useState([]);
    const [pageCount, setPageCount] = useState(0); //페이지 총 갯수
    const [searchParams, setSearchParams] = useSearchParams();
    const pageSize = 4 //4개씩 1페이지 구성
    useEffect(() => {
        const fetchData = async() => {
            try {
                // const page_number = searchParams.get("page") //searchParams.get("page") page란 변수 값을 어디서 가져오는지...
                const page_number = 1
                console.log("page_number", page_number)
                const response = await axios.get(`http://localhost:8080/board/pagination?page=${page_number}&pageSize=${pageSize}`)
                setBoardData(response.data)
                console.log("response data", response.data)

            } catch (error) {
                console.log('axios Error', error)
            }

        };
        fetchData()

        const getTotalBoard = async() => {
            const response = await axios.get('http://localhost:8080/board/')
            console.log("response data length", response.data.length)
            setPageCount(Math.ceil(response.data.length / pageSize))
        };

        getTotalBoard();
        console.log("totalPage", pageCount)

       

    }, []);

    const handlePageChange = async (e, value) => { //pagination component에서 화살표나 버튼에 따라 value값을 넘겨줌
        try {
            const response = await axios.get(`http://localhost:8080/board/pagination?page=${value}&pageSize=${pageSize}`);
            setBoardData(response.data);
        } catch (error) {
            console.log('axios Error', error);
        }
    };

    console.log("board data", boardData)

    return (
        <div className="boardList-wrapper">
        <div className="boardList-header">
        {/* 전체 게시물 📝 */}
        </div>
        <div className="boardList-body">
            {boardData.map((item) => (
                <Card key={item.id} username={item.username} //key={item.id} 꼭 넘겨줘야함
                    date={item.yyyymmdd}
                    title={item.title} content={item.content}
                    board_id={item.id} img_url={"https://source.unsplash.com/random/300x300/?korea"}
                />
            ))}
        </div>
        <div>
            <Pagination
            shape="rounded"
            variant="outlined" color="primary" page={Number(searchParams.get("page"))}
            count={pageCount} size="large"
            onChange={handlePageChange}
            showFirstButton showLastButton
            />
        </div>
      </div>


    );

};

export default BoardList;