const mongoose=require("mongoose");

const express=require("express");

const cors=require("cors");

const multer=require("multer");

const path=require("path");

const storage = multer.diskStorage({
    destination:  (req, file, cb) =>{
      cb(null, "profilePics")
    },
    filename:  (req, file, cb) =>{
        console.log(file);
     
        
      cb(null, `${Date.now()}_${file.originalname}`);
    }
  })
  
  const upload = multer({ storage: storage })

let app=express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use("/profilePics",express.static("profilePics"));
app.use(express.static(path.join(__dirname,"./client/build")));

app.get("*",(req,res)=>{
    res.sendFile("./client/buildindex.html");
})

app.post("/signup",upload.single("profilePic"),async(req,res)=>{
    console.log(req.file);
    console.log(req.files);
   

    try{
        let signedUpUser=new user({

            firstName:req.body.firstName,
            lastName:req.body.lastName,
            age:req.body.age,
            email:req.body.email,
            password:req.body.password,
            mobileNumber:req.body.mobileNumber,
            profilePic:req.file.path,
        });
        
        await signedUpUser.save();
        
        res.json({status:"success",msg:"created account successfully."})
        }

    catch(err){
        res.json({status:"failure",msg:"unable to create account"})

    }

})

app.post("/login",upload.none(),async(req,res)=>{
    console.log(req.body)

    let userData=await user.find().and({email:req.body.email});

    if(userData.length>0){

        if(userData[0].password == req.body.password){

            let userDetailsToSend={
                firstName:userData[0].firstName,
                lastName:userData[0].lastName,
                age:userData[0].age,                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
                email:userData[0].email,
               mobileNumber:userData[0].mobileNumber,
                 profilePic:userData[0].profilePic,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          tName:userData[0].firstName,firstName:userData[0].firstName,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          firstName:userData[0].firstName,
            };

            res.json({status:"success",data:userDetailsToSend,msg:"Email and password are correct"})

        }else{
            res.json({status:"failure",msg:"invalid password"})

        }

    }else{
        res.json({status:"failure",msg:"user doesnot exist"})
    }

    

})
    

app.listen(1111,()=>{
    console.log("listening to port 1111");
})

let userSchema=new mongoose.Schema({
    firstName:String,
    lastName:String,
    age:Number,
    email:String,
    password:String,
    mobileNo:String,
    profilePic:String,

})

let user=new mongoose.model("user",userSchema,"users");







let connectToMDB=async()=>{
   try{

    await mongoose.connect("mongodb+srv://sravanthikairam123:Sravanthi123@batch2501.zsv7h7g.mongodb.net/MyDB?retryWrites=true&w=majority&appName=batch2501")
   console.log("successfully connected to MDB")
   
}
   catch(err){
    console.log(err)
    console.log("unable to connect to MDB")
}
}
connectToMDB();



