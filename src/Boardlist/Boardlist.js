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
                const page_number = 0
                console.log("page_number", page_number)
                const response = await axios.get(`http://localhost:8080/board/pagination?page=${page_number}&size=${pageSize}`)
                // const response = await axios.get(`http://localhost:8080/board/pagination`)
                console.log("response", response.data.content)

                setBoardData(response.data.content)
                console.log("response data content", response.data.content)

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
            const response = await axios.get(`http://localhost:8080/board/pagination?page=${value - 1}&size=${pageSize}`); //jpa의 page는 0부터 시작
            setBoardData(response.data.content);
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
                    board_id={item.id} 
                    image={item.image}
                    img_url={item.img_url}
                    email={item.email}
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