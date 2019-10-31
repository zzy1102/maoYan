var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// router.get('*', function(req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin','*');
//     next();
// });

// 获取电影详情
app.get('/getFilm', (req, res) => {
    fs.readFile('./dataFilm.json', (err, data) => {
        var arr = JSON.parse(data.toString())
        res.json(arr)
    })
});
// 获取影院首页
app.get('/getCinema', (req, res) => {
    fs.readFile('./dataCinema.json', (err, data) => {
        var arr = JSON.parse(data.toString())
        res.json(arr)
    })
});
// 定位
app.get('/getCity', (req, res) => {
    fs.readFile('./city.json', (err, data) => {
        var arr = JSON.parse(data.toString())
        res.json(arr)
    })
});
// 搜索
app.post('/search', (req, res) => {
    // var str = '皮卡丘'
    var str = req.body
    // console.log("str",str)
    fs.readFile('./dataFilm.json', (err, data) => {
        var arr = JSON.parse(data.toString())
        let arr1 = arr.movieDetails
        let arr2 = []
        arr1.forEach(item => {
            if(str.val === '') return;
            if(item.title.includes(str.val)){
                arr2.push(item)
            }
        });
        // console.log("arr2",arr2)
        res.json(arr2)
    })
});



app.use(express.static('www'))

app.listen(3000, () => {
    console.log(3000);
})