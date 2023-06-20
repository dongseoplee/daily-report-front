import './App.css';
import axios from 'axios';
import {BrowserRouter, Router, Routes, Route} from 'react-router-dom';
import Navbar from './Navbar/Navbar.js';
import Mainpage from './Mainpage/Mainpage';
import Boardlist from './Boardlist/Boardlist';
import Board from './Borad/Board';
import WriteBoard from './WriteBoard/WriteBoard';
import SignUp from './SignUp/SignUp';
function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Navbar />
        <Routes>
          <Route path="/" element = { <Boardlist />} />
          <Route path="/board/:board_id" element = { <Board /> } />
          <Route path="/write" element = { <WriteBoard /> } />
          <Route path="/signin" element = { <SignUp /> }  />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
// document.getElementById('postForm').addEventListener('submit', function(event) {
//   event.preventDefault(); // 폼의 기본 동작인 페이지 새로고침 방지

//   var formData = new FormData(event.target); // 폼 데이터 수집

//   // 폼 데이터 확인
//   for (var pair of formData.entries()) {
//     console.log(pair[0] + ': ' + pair[1]);
//   }

//   // 여기서 폼 데이터를 활용하여 추가 작업 수행 가능

//   // AJAX 요청 등을 수행할 수 있음
//   axios.post("http://localhost:8080/board", formData)
//   .then(function (response) {
//       // response  
//       console.log(response)
//       console.log(response.data)
//       console.log(response.data.name)
//       console.log(response.data.email)
//       console.log(response.data.message)
//       // console.log(formData)
//   }).catch(function (error) {
//       // 오류발생시 실행
//       console.log("axios error")
//   }).then(function() {
//       // 항상 실행
//   });

// });

// document.getElementById("getForm").addEventListener('submit', function(event) {
//   event.preventDefault();
//   var nameInput = document.getElementById("nameGet"); //post form 안에 있는 id 와 동일하면 안됨
//   var name = nameInput.value;
//   console.log(name)

//   axios.get(`http://localhost:8080/test/${name}`)
//   // axios.get("http://localhost:8080/test/")
//   .then(function (response) {
//     var dataContainer = document.getElementById("axios-get-data");
//     dataContainer.innerHTML = response.data
//     console.log(response)
//     console.log(response.data)
//   }).catch(function (error){
//     console.log("axios error")
//   }).then(function() {

//   });

  
// });

// async function fetchData() {
//   try {
//     const response = await axios.get("http://localhost:8080/board");
//     var dbDataContainer = document.getElementById("axios-get-data-from-db");
//     var resName = "", resEmail = "", resMsg = "";
//     for (var i = 0; i < response.data.length; i++) {
//       resName += response.data[i].name + '<br>';
//       resEmail += response.data[i].email + '<br>';
//       resMsg += response.data[i].message + '<br>';
//     }
//     dbDataContainer.innerHTML = resName + '<br>' + resEmail + '<br>' + resMsg;
//     console.log(response);
//   } catch (error) {
//     console.log("axios error", error);
//   }
// }

// fetchData();



export default App;
