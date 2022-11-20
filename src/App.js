import logo from './logo.svg';
import './App.css';
import "./pages/Dashboard.css"
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import {useState} from "react";
import {useCookies} from "react-cookie";
import axios from "axios";

function App() {
  const [cookies, setCookie] = useCookies(['access_token'])
  const [token, setToken] = useState();
  const [userInfo, setUserInfo] = useState();
  if(cookies.access_token != null && !token) setToken(cookies.access_token)
  if(!token) {
    return <Login setToken={setToken} />
  }
  if (token && !userInfo){
      axios.get("https://pskovedu.ml/api/auth/login?code=" + token).then(
          (res) => {
              if (res.data.guid != null) {
                  console.log(res.data)
                  setUserInfo(res.data)
              }
          }
      )
  }
  return (
      <div className="wrapper">
        <BrowserRouter>
            <Routes>
            <Route path="/" element={<Dashboard user_info={userInfo} />}>
            </Route>
            </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
