const express = require('express')
const cors = require('cors')
const app= express()
const port=8080;
// const { readdirSync } = require('fs');
const swaggerUI = require('swagger-ui-express');
const yamljs=require('yamljs');
const swaggerDocument= yamljs.load('./docs/swagger.yaml');
// const swaggerDocument= require('./docs/swagger.json');
app.use(express.json())
app.use(cors())


const  theaters = [

   { id:1, name: "The poidgeon", price:290, rating:3},
   { id:2, name: "Kunda Kino", price:130, rating:4},
   { id:3, name: "Paladins:Champions of the Realm ", price:334, rating:5},
   { id:4, name: "Super Mario Bros. Wonder", price:644, rating:6 }
]

app.get('/theaters ',(req, res)=>{res.send(theaters)})

// app.post('/theaters',(req,res) => {
//     theaters.push({
//         id:theaters.length+1,
//         name: req.body.name,
//         price: req.body.price,
//         rating: req.body.rating
//     })

// res.end()

// })
//

app.get("/theaters/:id",(req,res) => {
     if(typeof theaters[req.params.id-1]==='undefined') {
        return res.status(404).send({error: "Theater not found"})
     }
          
        res.send(theaters[req.params.id-1])

})

app.get("/theaters",(req,res)=>{res .send (theaters)});

app.post("/theaters",(req,res)=>{
    if (!req.body.name|| !req.body.price||!req.body.rating){
        return res.status(400).send({error: "One or all parameters are missing"})
    }
    let theater={
        id:theaters.length+1,
        name:req.body.name,
        price:req.body.price,
        rating:req.body.rating
    }
    theaters.push(theater)
    res.status(201)
    .location(`${getBaseUrl(req)}/theaters/${theaters.length}`)
    .send(theater)
    
});

app.delete("/theaters/:id", (req, res) => {
    if (typeof theaters [req.params.id - 1] === 'undefined') {
        return res.status(404).send({error: "Theater not found"})
    };

    theaters.splice(req.params.id - 1, 1)

    res.status(204).send({error: "No content"})
});


app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument))

app.listen(port, () => {
    console.log(`API up at: http://localhost:${port}`)
})
function getBaseUrl(req){
    return req.connection && req.connection.encrypted ? 'https':
    'https'+`://${req.headers.host}`
}
