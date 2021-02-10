const express = require('express')
const app = express()
const connectdb = require('./config/db')
const userRoute = require('./routes/user')
const loginRoute = require('./routes/Login')
const userDetailRoute = require('./routes/userDetails')
connectdb()
app.use(express.json({ extended: false }))
app.use('/uploads', express.static('uploads'))
app.use('/api/user', userRoute)
app.use('/api/login', loginRoute)
app.use('/api/task', userDetailRoute)

// app.use('/public',express.static(__dirname+'/Public'))
const PORT = process.env.PORT || 1999
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    );
}
app.listen(PORT, () => {
    console.log("server is running")
})

// app.post('/single', upload.single('profile'), (req, res) => {
//     try {
//         res.send(req.file);
//     } catch (err) {
//         res.send(400);
//     }
// });