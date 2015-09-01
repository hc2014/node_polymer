var express = require('express');

var app     = express();
var server  = require('http').createServer(app);
var bodyParser = require('body-parser');//处理cookie的模块
var ejs = require('ejs');
var fs=require('fs');
var mult=require('connect-multiparty');

//设置模板为html
app.engine('.html', ejs.__express);
app.set('view engine','html');
app.set('views',__dirname+"/views");
app.set('view option',{layout:false});
app.use(express.static(__dirname+'/public'));
app.use(mult({ uploadDir: __dirname+'/temp' }));

app.use(bodyParser.json({limit:'20mb'}));
app.use(bodyParser.urlencoded({ extended: true,limit:'20mb'}));
//设置起始页面
app.get('/',function(req,res,next){
	res.render('index.html')
});

app.get('/views/*.html',function(req,res,next){
	return res.render(req.params[0])
});
app.get('/views/demo/*.html',function(req,res,next){
	return res.render(req.params[0])
});
app.post('/views/iron-ajax.html',function(req,res){
	console.log(req.query);
	res.json("这个是ajax请求回发到数据!");
})
server.listen(3000);
console.log("3000端口启动了!!")
