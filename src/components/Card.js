import { useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
import "./Card.scss";
import defaultImage from "../images/noimage.png"
const Card = ({board_id, title, content, img_url, username, date, image, email}) => { 
    const navigate = useNavigate();
    return (
        <div className="card-wrapper" onClick={() => {navigate(`/board/${board_id}`)}}>
        {/* <div className="card-wrapper"> */}
            
            <div className="card-body-img">
              {
                image != "null" ? (
                  <img src={image} alt="Image" />
                ) : (
                  <img src={defaultImage} alt="noImage" />
                )}
            </div>

            <div className="card-body-text">
              <div className="card-body-text-title">{title}</div>
              <div className="card-body-text-content">{content}</div>
            </div>

            <div className="card-footer">
              <div className="username">{email}</div>
              <div className="date">{date}</div>
            </div>

          </div>
    );

};

export default Card;