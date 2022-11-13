
import QRCode from "react-qr-code";
import PropTypes from 'prop-types';
import {useEffect, useState} from "react";
import axios from "axios";
import { useCookies } from 'react-cookie'
import {Card, CardContent, CircularProgress, Paper, Typography} from "@mui/material";


export default function Login({ setToken }) {
    const [code, setCode] = useState(0)
    const [intervalId, setIntervalId] = useState(0)
    const [cookies, setCookie] = useCookies(['access_token'])
    if (code == 0 && cookies.access_token == null){
        axios.get("http://127.0.0.1:8000/auth/get_key").then((res) => {
            setCode(res.data);
        })
    }
    else if (code == 0 && cookies.access_token != null) setCode(cookies.access_token)
    useEffect(() => {
        let id = setInterval((args) => {
            if(code != 0) {
                axios.get("http://127.0.0.1:8000/auth/verify?code=" + code).then(
                    (res) => {
                        if (res.data.guid != null) {
                            console.log(res.data)
                            setCookie("access_token", code)
                            clearInterval(id)
                            setToken(res.data)
                        }
                    }
                )
            }
        }, 1000)
    })
    return(
        <div className="login-wrapper">
            <Card sx={{ width: "320px", borderRadius: "10px", position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
            <CardContent>
                <Typography sx={{ fontSize: 24 }} color="text.primary" gutterBottom>
                    Дневник Pskovedu
                </Typography>
            <Typography color="text.secondary">Отсканируйте QR-код в приложении Дневник>Сменить пользователя>QR</Typography>
                {code != 0 ?
                    <QRCode style={{margin: "10px"}} value={code.toString()} /> :
                    <CircularProgress style={{margin: "10px"}} />}
            </CardContent>
            </Card>
        </div>
    )
}


Login.propTypes = {
    setToken: PropTypes.func.isRequired
};