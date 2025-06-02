import express from 'express';
import fs from "fs"
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
// mongodb+srv://mohammadsaber:<db_password>@myfirstnodejscluster.ud0im4b.mongodb.net/?retryWrites=true&w=majority&appName=myfirstnodejscluster
mongoose.connect("mongodb+srv://mohammadsaber:goldce159159@myfirstnodejscluster.ud0im4b.mongodb.net/?retryWrites=true&w=majority&appName=myfirstnodejscluster").then(() => {
    console.log("connection confirmed")
}).catch((error) => {
    console.log("error ocured" + error)
})

import Article from './models/article.js';
app.use(express.json())
app.get("/hello", (req, res) => {
    res.send("hello from hello")
})
app.get("/", (req, res) => {
    res.send("hello from js to post man")
})
app.get("/num/:num1/:num2", (req, res) => {
    let num1 = req.params.num1
    let num2 = req.params.num2
    res.send(`the summation of numbers is ${+num1 + +num2}`)
})
app.get("/test", (req, res) => {
    res.send("hello from test")
})
app.post("/add", (req, res) => {
    res.send("hello from page of add with post")
})
app.get("/indexd", (req, res) => {
    res.sendFile(__dirname + "/views/index.html")
})
app.put("/man", (req, res) => {
    res.send("hello from man put")
})
app.get("/numbers", (req, res) => {
    let counter = []
    for (let i = 0; i <= 100; i++) {
        counter.push(i)
    }

    res.render("index.ejs", ({
        name: "mohammad"
    }))

})
app.delete("/testDel", (req, res) => {
    res.send("hello from delete")
})
app.get("/sum", (req, res) => {
    res.send("num1 * num2")
})
app.get("/sayhello", (req, res) => {
    const name = req.body.name
    const age = req.query.age
    res.json({
        name,
        age,
        "lang": "arb"
    })
})
app.post("/article", async (req, res) => {
    const articles = new Article()
    articles.title = req.body.title
    articles.body = req.body.bodies
    articles.likes = req.body.likes
    await articles.save()
    res.send("article has been saved")
})
app.get("/articles", async (req, res) => {
    const art = await Article.find()
    res.json(art)
})
app.get("/show", async (req, res) => {
    const art = await Article.find()
    res.render("index.ejs",({
        articles:art
    }))
})
app.get('/article/:id', async (req, res) => {
    let id = req.params.id
    let data = await Article.findById(id)
    res.json(data)
})
app.delete('/article/:id',async(req,res)=>{
    let id=req.params.id
    try {
        let article=await Article.findByIdAndDelete(id)
        return res.send("deleted")
    } catch (error) {
        
        return res.send(error)
    }
})
app.patch('/article/:id',async(req,res)=>{
    let id=req.params.id
    try {
        Article.title="the patch title"
        let article=await Article.findById(id)
        return res.json(article)
    } catch (error) {
        
        return res.send(error)
    }
})
let port = 1000
app.listen(port, () => {
    console.log(`localhost:${port}`)
})