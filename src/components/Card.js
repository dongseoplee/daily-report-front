import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import "./Card.scss";
const Card = ({board_id, title, content, img_url, username, date, image}) => { 
    const navigate = useNavigate();
    const src = image || "../images/noimage.png"
    return (
        <div className="card-wrapper" onClick={() => {navigate(`/board/${board_id}`)}}>
        {/* <div className="card-wrapper"> */}
            
            <div className="card-body-img">
              {/* <img src={img_url} alt="Card image cap"/> */}
              <img src={src} alt="Card image cap"/>
            </div>

            <div className="card-body-text">
              <div className="card-body-text-title">{title}</div>
              <div className="card-body-text-content">{content}</div>
            </div>

            <div className="card-footer">
              <div className="username">{username}</div>
              <div className="date">{date}</div>
            </div>

          </div>
    );

};

export default Card;