const express = require("express");
const https = require("https") ;
const bodyParser = require("body-parser");
const request = require("request");


const app  = express();
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/signup.html");
})


app.post("/", function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName,
                }
            }
        ]
    };
    const jsonDATA = JSON.stringify(data);

    const url = "https://us9.api.mailchimp.com/3.0/lists/d2faa216b0/";
    const options = {
        method: "POST",
        auth: "sahil:7bfc668a7a82e55ffb6cf1811e512eed-us9"
    }
    const request = https.request(url, options, function (response) {

        if (response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });
    request.write(jsonDATA);
    request.end();
});

app.post("/failure", function (req, res) {
    res.redirect("/");
})
app.listen(process.env.PORT || 3000,function (req,res) {
    console.log("Server is up and running on PORT 3000");
});

//API Key
//7bfc668a7a82e55ffb6cf1811e512eed-us9

//Unique ID
//d2faa216b0