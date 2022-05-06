
const axios = require('axios').default;

const express = require("express")

const app = express()


let webhooks = []



const fakeMessages = [
    "Hey, I have a problem with my order",
    "I'd like to return my purchase",
    "Do you have any new promotions?"
]



setInterval(() => {

    const message = fakeMessages [  Math.floor(  Math.random() * 3   )  ]

    console.log(message);


    webhooks.forEach((url) => {

        axios.post(url, {message})

    } )


}, 5000)




app.get("/test", (req, res) => {

    console.log("Somebody called me", req.rawHeaders)

    res.send("IT'S WORKING!!! (Bobby)")

})


app.post("/webhook", (req, res) => {
 
    const url = req.query.url

    console.log("!!!! SOMEBODY REGISTERED A WEBHOOK !!! ")

    webhooks.push(url)

    res.end()
    
})

app.delete("/webhook", (req, res) => {

    const url = req.query.url

    webhooks = webhooks.filter(el => el !== url)

    res.end()
})


app.listen(5555, () => {
    console.log("Listening on port 5555")
})
