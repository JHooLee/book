var express = require('express')//node_modules 내 express 관련 코드를 가져온다
var app = express()
var cors = require('cors')
var logger = require('morgan')
var mongoose = require('mongoose')
var routes = require('./src/routes')

var corsOption = {//cors 옵션
    origin: 'http://localhost:3000',
    credentials : true
}

const CONNECT_URL = 'mongodb://localhost:27017/jhldb'
mongoose.connect(CONNECT_URL, {//mongo db 서버 연결
    useNewUrlParser: true,
    useUnifiedTopology : true 
}).then(() => console.log("mongodb connected"))
.catch(e => console.log(`failed to connect mongodb: ${e}`))

app.use(cors(corsOption))//cors 설정
app.use(express.json())//request body 파싱
app.use(logger('tiny'))//logger 설정
app.use("/api", routes)//api 라우팅

app.get('/hello', (req, res) => {//url 응답 테스트
    res.send('hello world')
})

app.use((req, res, next) => {//사용자가 요청한 페이지가 없는 경우 에러처리
    res.status(404).send("sorry can`t find page")
})

app.use((err, req, res, next) => {//서버 내부 오류 처리
    console.error(err.stack)
    res.status(500).send("something is broken on server")
})

app.listen(5600, () => {//5600 포트로 서버 오픈
    console.log('server is running on port 5600...')
})