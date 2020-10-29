const express = require('express');
const app = express();
const mongoose = require('mongoose');

//DATABASE
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/app_mean', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB conectado!!!"))
.catch((err) => console.error("Erro ao conectar com o Mongo: " +err))

//MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MODEL
const User = require('./models/user');

//GET ALL
app.get('/users', (req, res) => {
    User.find()
         .then((data) => {
             res.send(data);
         })
         .catch((err) => {
             console.error(err);
             res.sendStatus(400).send(err);
         });
});

app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    User.findById(id)
         .then((user) => res.send(user))
         .catch((err) => {
            console.error(err);
            res.sendStatus(400).send(err);
        });
});

app.post('/user', (req, res) => {
    const user = req.body;
    if (!user) {
        res.status(400).send({
            error: "Payload vazio"
        });
        return;
    }

    User(user).save()
         .then(() => {
             res.sendStatus(201);
         })
         .catch((err) => {
             console.error(err);
             res.sendStatus(400).send(err);
         });
})

app.put('/user/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    if(!data || !id) {
        res.sendStatus(400)
    }
    
    User.findByIdAndUpdate(id, data)
         .then(() => res.sendStatus(200))
         .catch(() => res.sendStatus(400));
});

app.delete('/user/:id', (req, res) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send({
            error: "Payload vazio"
        });
        return;
    }

    User.findByIdAndRemove(id)
        .then(() => res.sendStatus(200))
        .catch((err) => {
            console.error(err);
            res.sendStatus(400).send(err);
        });
})

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000")
});