import express from 'express';

const app = express();
const PORT = 5001;

app.use(express.json());

let posts = [];

// creating a post
app.post('/posts', (req, res) => {
    try{

        const {title, content, category, tags} = req.body;

        if(!title || !content){
            return res.status(400).json("uh oh make sure to enter a title and body!");
        }

        const newId = posts.length + 1;

        const newPost = {
            id: newId,
            title,
            content,
            category,
            tags,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        posts.push(newPost);

        res.status(201).json(newPost);

    } catch(error) {
        return res.status(404).json({error: "oops some error has occured!"})
    }
})

app.listen(PORT, () => {
    console.log("Listening at port 5001!")
})