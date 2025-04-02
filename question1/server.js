const express = require('express');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/',(req,res) =>{
    res.send('Welcome to Social media Analytics');
})

app.use('/users', userRoutes);
app.use('/posts', postRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
