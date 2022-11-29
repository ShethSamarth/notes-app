const express = require("express")
const mongoose = require("mongoose")
const Note = require("./models/Note")
const User = require("./models/User")
const app = express()
app.use(express.json({ extended: true }))
app.use(express.urlencoded())
const port = process.env.PORT || 3000

mongoose.connect(
  "mongodb+srv://sheth_samarth:drys6048@cluster0.bntqw2u.mongodb.net/?retryWrites=true&w=majority",
  function (error) {
    if (!error) {
      console.log("MongoDB Connected")
    }
  }
)

// HTML Endpoints
app.get("/", (req, res) => {
  res.sendFile("/pages/index.html", { root: __dirname })
})

app.get("/login", (req, res) => {
  res.sendFile("/pages/login.html", { root: __dirname })
})

app.get("/signup", (req, res) => {
  res.sendFile("/pages/signup.html", { root: __dirname })
})

// API Endpoints
app.post("/getnotes", async (req, res) => {
  let notes = await Note.find({ email: req.body.email })
  res.status(200).json({ success: true, notes })
})

app.post("/login", async (req, res) => {
  let user = await User.findOne(req.body)
  if (!user) {
    res.status(200).json({ success: false, message: "No user found" })
  } else {
    res.status(200).json({
      success: true,
      user: { email: user.email },
      message: "User found",
    })
  }
})

app.post("/signup", async (req, res) => {
  let user = await User.create(req.body)
  res.status(200).json({ success: true, user })
})

app.post("/addnote", async (req, res) => {
  let note = await Note.create(req.body)
  res.status(200).json({ success: true, note: note })
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})
