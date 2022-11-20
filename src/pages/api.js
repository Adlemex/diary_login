import axios from "axios"
const base_url = "https://pskovedu.ml/api/"
export async function getDiaryDay(setter, guid, day){
    setter(null)
    console.log("fet")
    if (day === undefined) day = ""
    let res = await axios.post(base_url + "journals/diaryday", {
        guid: guid,
        date: day
    })
    if(res.data.success === true) setter(res.data.data)
}
export async function getAllMarks(setter, guid){
    setter(null)
    console.log("fet")
    let res = await axios.post(base_url + "journals/allmarks", {
        guid: guid
    })
    if(res.data.success === true) setter(res.data.data)
}
export async function getUserInfo(setter, code){
    setter(null)
    console.log("logib")
    let res = await axios.get(base_url + "auth/login?code=" + code.toString())
    console.log("logged")
    if(res.status === 200) setter(res.data)
}