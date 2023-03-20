const express = require('express');
const bodyParser = require('body-parser');
// const Post = require('./models/post');
const mongoose = require('mongoose');


const app = express();

mongoose.connect("mongodb+srv://chwung:chwungpassword@cluster0.jmxyj3v.mongodb.net/node-angular?retryWrites=true&w=majority")
  .then(()=> {
    console.log('connected to database');
  })
  .catch ((err) => {
    console.log('connection failed', err);
  });

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("app.use set header n nove nxt");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });

  post.save();

  console.log(post);
  res.status(201).json({
    message: "Post added successfully"
  });
});

// app.use('/api/posts' ,(req, res, next) => {
//   // Add dummy posts content. Later should get from database
//   const posts = [
//     {id: 'flakdl',
//     title: "Firsst server side post",
//     content: "This is coming from the server"
//     },

//     {id: 'o8odif',
//     title: "Second server side post",
//     content: "This is coming from the server"
//     }
//   ];

//   res.status(200).json({
//     //message property
//     message: 'Post fetched successfully',
//     //post property that get the dummy data above
//     posts: posts
//   })

//   //res.send('Hello from express')
// });

app.get('/api/posts', (req, res, next) => {
  Post.find().then(documents => {
    res.status(200).json({
      message: 'Post fetched successfully',
      posts: documents
    })
  })
})

//export for other module can import
module.exports = app;
