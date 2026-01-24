const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const users = [{ id: 1, name: 'Alice', email: 'alice@example.com' }, 
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }];
// let currentId = users[users.length - 1].id;
const lastUser = users.reduce((max, user) => user.id > max ? user.id : max, users[0].id);
let currentId = lastUser + 1;

app.post('/users', (req, res) => {
    const {name, email} = req.body;
    if (!name || !email) {
        return res.status(400).json({error: 'Name and email are required!'});
    }
    const newUser = { id: currentId++, name, email };
    users.push(newUser);
    res.status(201).json({message: 'User created successfully', data: newUser});
});

app.get('/users/all', (req, res) => {
    res.status(200).json({data: users});
});

app.get('/', (req, res) => {
  res.send('<h1>Hello node js</h1>');
});

app.get('/calculate/:x/:y', (req, res) => {
    const result = Number.parseInt(req.params.x) + Number.parseInt(req.params.y);
  res.status(200).send(`la somme de ${req.params.x} + ${req.params.y} = ${result}`);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});