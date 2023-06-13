import React from "react";

const Navbar = () => {
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
        </div>
        </nav>
    );

};

export default Navbar;