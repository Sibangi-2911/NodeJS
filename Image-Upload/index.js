const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8000;

//upload is a middleware whateverfile will be uploaded put that file in uploads folder
//const upload = multer({ dest: "uploads/" });
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    return cb(null,"./uploads");
  },
  filename: function(req,file,cb) {
    return cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({storage});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false})); //to parse form data we use this middleware

app.get("/", (req,res)=>{
  return res.render("homepage");
});

app.post("/upload", upload.single("profileImage") ,(req,res)=>{
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});

app.listen(PORT, ()=>console.log(`Server started at port ${PORT}`));
