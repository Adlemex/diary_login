import './Dashboard.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import {Avatar, Card, createTheme, Grid, ListItem, Paper, Skeleton, Stack, Tab, Tabs, TextField} from "@mui/material";
import {useState} from "react";
import {DatePicker, DesktopDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import dayjs from "dayjs";
import {format} from 'date-fns';
import {getAllMarks, getDiaryDay, getUserInfo} from "./api"
import {AdapterMoment} from "@mui/x-date-pickers/AdapterMoment";

const date_pattern = /(\d{2})\.(\d{2})\.(\d{4})/;

Date.prototype.addDays=function(d){return new Date(this.valueOf()+864E5*d);};
function Dashboard(props) {
    const theme = createTheme()
    const [cur_date, setDate] = useState(new Date());
    const [user, setUser] = useState(0)
    const [allMarks, setAllMarks] = useState(0)
    //let  = dayjs.date
    const [day, setDay] = useState(0);
    const [markTab, setMarkTab] = useState(1);
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }
    if(user === 0 && props.user_info != null) {
        setUser(props.user_info);
    }
    if(day === 0 && user != null && user !== 0){
        setDay(null)
        getDiaryDay(setDay, user.guid)
    }
    if(allMarks === 0 && user != null && user !== 0){
        setAllMarks(null)
        getAllMarks(setAllMarks, user.guid)
    }
    function getColor(mark){
        if (mark == 5) return "#ac00ff"
        else if (mark == 4) return "#14b400"
        else if (mark == 3) return "#ffb700"
        else if (mark == 2) return "#ff0000"
        else if (mark == 1) return "#ff0000"
    }
    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }
    const bc = "rgba(209,104,229,0.39)"
    const Lesson = (props) => {
        //num: Number, time: String, name: String, homework: String, teacher: String, marks: Number[]
        return (
            <>
            <Typography style={{background: "#9400ad",
                borderTopLeftRadius: "20px",
                display: "flex",
                color: "white",
                fontSize: "80%",
                justifyContent: "space-between",
                borderTopRightRadius: "20px",
                paddingLeft: "15px",
                paddingRight: "15px"}}><span>{props.num}</span> <span>{props.time}</span></Typography>

        <Typography style={{background: bc,
            display: "flex",
            textAlign: "left",
            paddingLeft: "15px",
            paddingRight: "15px"}}>{props.name}</Typography>

        <Typography style={{background: bc,
            display: "flex",
            paddingLeft: "15px",
            textAlign: "left",
            fontSize: "80%",
            paddingRight: "15px"}}>{props.teacher}</Typography>

        <Typography style={{background: bc,
            display: "flex",
            textAlign: "left",
            paddingLeft: "15px",
            fontSize: "70%",
            paddingRight: "15px"}}>{props.homework}</Typography>
                {props.marks.length > 0 ?
        <Typography style={{background: bc,
            display: "flex",
            textAlign: "left",
            paddingLeft: "15px",
            fontSize: "120%",
            paddingRight: "15px"}}>{props.marks.map((mark) => <span style={{color: getColor(mark.VALUE)}}>{mark.VALUE + "\n"}</span>)}</Typography>:
                <></>}
            </>
        )
    }
    const Marks = (props) => {
        //num: Number, time: String, name: String, homework: String, teacher: String, marks: Number[]
        return (
            < >
        <Typography component={'span'}  style={{background: "rgba(209,104,229,1)",
            display: "flex",
            textAlign: "left",
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingLeft: "15px",
            color: "white",
            paddingRight: "15px"}}>{props.lesson}</Typography>
            <div className={"marks"} style={{display: "flex", maxWidth: 1024, flexDirection: "row", overflowX: "auto"}}>
                {props.marks.map((mark, i) =>
                    <div key={i}>
                        <Card component={''}  style={{width: 50, margin: 2}}>{format(new Date(mark.DATE.replace(date_pattern,'$3-$2-$1')),
                            "dd.MM")}
                            <br /> <span style={{color: getColor(mark.VALUE)}}>{mark.VALUE}</span></Card>
                    </div>
                )}
            </div>
            </>
        )
    }
    //getDay()
    //
  return (
      <Box sx={{ flexGrow: 1 }} style={{overflowX: "clip"}}>
        <AppBar position="sticky" style={{height: "6vh", minHeight: 50}}>
            <Grid>
                <Typography variant="h6" style={{display: "inline-block", position: "absolute",
                    top: "50%", marginLeft: 6, msTransform: "translateY(-50%)", transform: "translateY(-50%)"}} sx={{flexGrow: 1}}>
                    Дневник Pskovedu
                </Typography>
              <IconButton style={{display: "inline-block", position: "relative", float: "right"}}>
                  {user ? <Avatar src={"https://pskovedu.ml/api/images/" + user.messages_guid} />
                  :
                  <Skeleton variant={"circular"} animation={"wave"}>
                      <Avatar></Avatar>
                  </Skeleton> }

              </IconButton>
                <Button style={{height: "100%", position: "relative", float: "right"}} color="inherit">{user ? user.name : <Skeleton width={100}
                                                                                                                                animation={"wave"}/>}</Button>
            </Grid>
        </AppBar>
          <Grid container columnGap={0}>
          <Box  sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: "stretch",
              textAlign: "center",
              verticalAlign: "middle",
              '& > :not(style)': {
                  marginTop: "1vh",
                  width: "35vw",
                  height: "90vh"
              },
          }}>
              <Paper style={{overflow: "scroll"}}>
                  <Grid container columnGap={0} rowGap={4} style={{margin: "1vh"}}>
                      <Button onClick={() => {
                          setDate(cur_date.addDays(-1))
                          getDiaryDay(setDay, user.guid, format(cur_date,'dd.MM.yyyy'))
                      }}>{"<--"}</Button>
                        <LocalizationProvider dateAdapter={AdapterMoment} >
                            <DesktopDatePicker
                                label="Дата"
                                value={cur_date}
                                minDate={dayjs.date}
                                inputFormat="DD.MM"
                                onChange={(date) => {
                                    setDate(new Date(date.toString()))
                                    getDiaryDay(setDay, user.guid, format(cur_date,'dd.MM.yyyy'))
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                      <Button onClick={() => {
                          setDate(cur_date.addDays(1))
                          getDiaryDay(setDay, user.guid, format(cur_date,'dd.MM.yyyy'))
                      }}>{"-->"}</Button>
                  </Grid>
                  <Stack spacing={2} style={{marginLeft: 5, marginRight: 5}}>
                      {day !== 0 && day != null ? day.map((lesson) =>
                          <div key={lesson.LESSON_NUMBER}>
                    <Lesson num={lesson.LESSON_NUMBER} teacher={lesson.TEACHER_NAME}
                    homework={lesson.HOMEWORK_PREVIOUS ? lesson.HOMEWORK_PREVIOUS.HOMEWORK : ""} marks={lesson.MARKS}
                    time={lesson.LESSON_TIME_BEGIN + "-" + lesson.LESSON_TIME_END} name={lesson.SUBJECT_NAME} />
                          </div>) :
                        <Skeleton style={{height: "80vh", marginLeft: 5}} variant={"rounded"} animation={"wave"}></Skeleton>}
                  </Stack>
              </Paper>
          </Box>
          <Box  sx={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: "center",
              textAlign: "center",
              verticalAlign: "middle",
              '& > :not(style)': {
                  m: 2,
                  marginTop: "1vh",
                  width: "60vw",
                  height: "90vh",
              },
          }}>
              <Paper style={{overflowX: "scroll"}}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs value={markTab} onChange={(event, value) => setMarkTab(value)} aria-label="basic tabs example">
                          <Tab label="Четвертные оценки" {...a11yProps(0)} />
                          <Tab label="Все оценки" {...a11yProps(1)} />
                          <Tab label="Итоговые оценки" {...a11yProps(2)} />
                      </Tabs>
                  </Box>
                  <TabPanel value={markTab} index={0}>
                      Скоро!
                  </TabPanel>
                  <TabPanel value={markTab} index={1}>
                      <Stack spacing={2} style={{margin: "5px"}}>
                          {allMarks !== 0 && allMarks != null ? allMarks.map((lesson) =>
                          <Marks key={lesson.SUBJECT_NAME} lesson={lesson.SUBJECT_NAME} marks={lesson.MARKS} />):
                          <Skeleton style={{height: "76vh"}} variant={"rounded"} animation={"wave"}/>}
                      </Stack>
                  </TabPanel>
                  <TabPanel value={markTab} index={2}>
                      Скоро!
                  </TabPanel>
              </Paper>
          </Box>
          </Grid>
      </Box>
  );
}

export default Dashboard;
