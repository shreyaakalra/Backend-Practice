import express from 'express';
import initDB from './database.js'

const app = express();
const PORT = 5001;

app.use(express.json());

let db;

// creating a post
app.post('/posts', async(req, res) => {
    try{

        const {title, content, category, tags} = req.body;

        if(!title || !content){
            return res.status(400).json("uh oh make sure to enter a title and body!");
        }

        const createdAt = new Date().toISOString();
        const updatedAt = new Date().toISOString();

        const tagsString = JSON.stringify(tags || []);

        const result = await db.run(
            `INSERT INTO posts (title, content, category, tags, createdAt, updatedAt) VALUES(?, ?, ?, ?, ?, ?)`,
            [title, content, category, tagsString, createdAt, updatedAt]
        );

        const newPost = {
            id: result.lastID,
            title,
            content,
            category,
            tags,
            createdAt,
            updatedAt
        }

        res.status(201).json(newPost);

    } catch(error) {
        return res.status(404).json({error: "oops some error has occured!"})
    }
})

// reading all posts
app.get('/posts', async(req, res) => {
    try{
        const allPosts = await db.all('SELECT * FROM posts')
        res.json(allPosts);
    } catch(error){
        console.log(error);
        res.json("something's wrong!");
    }
})

// reading a specific post 
app.get('/posts/:id', async(req,res) => {
    try{
        const id = parseInt(req.params.id);

        const wantedPost = await db.get('SELECT * FROM posts WHERE id = ?', [id]);

        if(!wantedPost){
            return res.status(404).json({error: "No post with this id exists!"});
        }

        if(wantedPost.tags){
            wantedPost.tags = JSON.parse(wantedPost.tags);
        }

        res.status(200).json(wantedPost);

    } catch(error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong!" });    }
})

// updating a post
app.put('/posts/:id', (req, res) => {
    try{
        const id = parseInt(req.params.id);

        const postIndex = posts.findIndex((post) => post.id === id);

        if(postIndex === -1){
            return res.status(404).json({error: "Post now found."});
        }

        const {title, content, category, tags } = req.body;

        if(!title || !content){
            return res.status(400).json({error: "Make sure to ass title and content!"});
        }

        posts[postIndex] = {
            id: id,
            title: title,
            content: content,
            category: category,
            tags: tags,
            createdAt: posts[postIndex].createdAt,
            updatedAt: new Date().toISOString()
        }

        res.status(200).json(posts[postIndex]);

    } catch(error) {
        console.log(error);
        res.status(500).json({error: "Oops, something went wrong!"});
    }
})

// deleting a post
app.delete('/posts/:id', (req, res) => {
    try{
        const id = parseInt(req.params.id);

        const postIndex = posts.findIndex((post) => post.id === id);

        if(postIndex===-1){
            return res.status(404).json({error: "Not Found"});
        }

        posts.splice(postIndex, 1);

        res.status(204).send();

    } catch(error){
        console.log(error);
        res.status(500).json({error: "uh oh something went wrong!"});
    }
} )

initDB().then((databaseInstance) => {
    db = databaseInstance;
    app.listen(PORT, () => {
        console.log(`Listening at port ${PORT}! Database connected.`)
    });
})