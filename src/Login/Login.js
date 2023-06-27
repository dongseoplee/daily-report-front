import axios from "axios";
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {Formik, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button, TextField} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import { setToken } from "../redux/reducers/AuthReducer";
import "../SignUp/SignUp.scss";
import "../Utils/jwtUtils"
import jwtDecode from "jwt-decode";

const Login = () => {
    const navigate = useNavigate();
  // 쿼리 파라미터 받아오기
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("올바른 이메일 형식이 아닙니다!")
      .required("이메일을 입력하세요!"),
    password: Yup.string()
      .required("패스워드를 입력하세요!")
  });
  const submit = async (values) => {
    console.log(values.email)
    console.log(values.password)

    // const {email, password} = values;
    const formData = new FormData();
    formData.append("email", values.email);
    formData.append("password", values.password);
    console.log("formData", formData);
    try {
      const response = await axios.post("http://localhost:8080/login", formData);
      //백엔드에서 생성한 토큰을 받는다.
      console.log("response data", response.data)
      const jwt = response.data
      // const decodedToken = jwtDecode(jwt);
      // console.log(decodedToken.sub); // 해독해서 email값 알아냄
      dispatch(setToken(jwt))
      
      const redirectUrl = searchParams.get("redirectUrl");
      toast.success(<h3>로그인 성공😎</h3>, {
        position: "top-center",
        autoClose: 2000
      });
      // redirectUrl이 쿼리스트링으로 존재하면
      // 원래가고자 했던 페이지로 돌아가기
      setTimeout(()=> {
        if (redirectUrl) {
          navigate(redirectUrl);
        } else {
          navigate("/");
        }
      }, 2000);


    } catch (e) {
      // 서버에서 받은 에러 메시지 출력
      toast.error(e.response.data.message + "😭", {
        position: "top-center",
      });
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={submit}
    >
      {({values, handleSubmit, handleChange}) => (
        <div className="signup-wrapper">
          <ToastContainer/>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="input-forms">
              <div className="input-forms-item">
                <div className="input-label">이메일</div>
                <TextField
                  value={values.email}
                  name="email"
                  variant="outlined"
                  onChange={handleChange}
                />
                <div className="error-message">
                  <ErrorMessage name="email"/>
                </div>
              </div>
              <div className="input-forms-item">
                <div className="input-label">비밀번호</div>
                <TextField
                  value={values.password}
                  name="password"
                  variant="outlined"
                  type="password"
                  onChange={handleChange}
                />
                <div className="error-message">
                  <ErrorMessage name="password"/>
                </div>
              </div>
              <Button
                color="primary"
                variant="contained"
                fullWidth
                type="submit"
              >
                로그인
              </Button>
            </div>
          </form>
        </div>
      )}
    </Formik>
  );

};

export default Login;