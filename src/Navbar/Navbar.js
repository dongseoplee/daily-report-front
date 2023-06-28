import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AuthInitialState, clearToken } from "../redux/reducers/AuthReducer";
import { jwtUtils } from "../Utils/jwtUtils";
import { useNavigate } from "react-router-dom"
import { logout } from "../redux/reducers/AuthReducer";

const Navbar = () => {
    const token = useSelector(state => state.Auth.token);
    const email = jwtUtils.isAuth(token) ? jwtUtils.getId(token) : null;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        // dispatch(clearToken());
        navigate("/login");
    };
    
    return(
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/">Daily Report</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
                <a class="nav-item nav-link active" href="/">게시판</a>
                <a class="nav-item nav-link" href="/write">글쓰기</a>
                <a class="nav-item nav-link" href="/login">로그인</a>
                <a class="nav-item nav-link" href="/signin">회원가입</a>
                
            </div>
            <div class="email-user" align="right">
            {
                    email ? (
                        <p>{email}님 환영합니다.</p>

                    ) : (
                        <a class="nav-item nav-link" href="/login">로그인하세요.</a>

                    )
            }
            <button onClick={handleLogout}>로그아웃</button>
            </div>
        </div>
        </nav>
    );

};

export default Navbar;