const express=require("express") ;
const bodyParser =require("body-parser");

const app=express();
const port=process.env.PORT||3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"))
var heading="";
var todolist=new Array();
var todolistToday=new Array();
var todolistWork=new Array();
function getToday()
{
    const currentDate = new Date();
    var Month=currentDate.toLocaleString('en-US', { month: 'long' })
    var Day=currentDate.toLocaleString('en-US', { weekday: 'long' })
    var Date1=currentDate.getDate();
    heading=Day+","+Month+" "+Date1;
    //console.log(heading)

}
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.engine('ejs', require('ejs').__express);

app.get("/",(req,res)=>
{
    getToday();
    todolist=todolistToday;
    res.render("index.ejs",{heading,todolist});
})
app.get("/work",(req,res)=>
{
    heading="Work List";
    todolist=todolistWork;
    res.render("index.ejs",{heading,todolist});
})
app.post("/", function(req, res){
    var item=req.body["newItem"];
    heading=req.body["list"];
    if(heading!="Work List")
    {
        todolistToday.push(item);
        todolist=todolistToday;
    }
    else
    {
        todolistWork.push(item);
        todolist=todolistWork;
    }
    
    console.log(todolist);
    res.render("index.ejs",{heading,todolist});
});
app.listen(port,()=>
{
        console.log("Listening on Port",port)
})
