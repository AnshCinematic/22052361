const express = require('express');
const axios = require('axios');

const router = express.Router();
const API_ENDPOINT = "http://20.244.56.144/test/users/:userid/posts";
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNTk4OTk3LCJpYXQiOjE3NDM1OTg2OTcsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjdiM2U2NTQ5LTJiM2QtNGI5NC1iYWRhLTEzMmMzNmMxNWM5NyIsInN1YiI6IjIyMDUyMzYxQGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MjM2MUBraWl0LmFjLmluIiwibmFtZSI6ImFuc2ggc3JpdmFzdGF2YSIsInJvbGxObyI6IjIyMDUyMzYxIiwiYWNjZXNzQ29kZSI6Im53cHdyWiIsImNsaWVudElEIjoiN2IzZTY1NDktMmIzZC00Yjk0LWJhZGEtMTMyYzM2YzE1Yzk3IiwiY2xpZW50U2VjcmV0IjoiVEV1c3RSSEN1ZkFTS1ZjQiJ9.Sp-suDGxx7JXHJ-XQToUEyISNwGKN3MtkO6WrN0KBZs";

router.get('/', async (req, res) => {
    try {
        const { type } = req.query;
        if (!type || !['popular', 'latest'].includes(type)) {
            return res.status(400).json({ error: "Invalid type parameter. Use 'latest' or 'popular'." });
        }

        const config = { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } };
        const [postResponse, commentResponse] = await Promise.all([
            axios.get(`${API_ENDPOINT}/posts`, config),
            axios.get(`${API_ENDPOINT}/comments`, config)
        ]);

        const posts = postResponse.data;
        const comments = commentResponse.data;
        let response;

        if (type === "popular") {
            const commentCounts = comments.reduce((acc, { postId }) => {
                acc[postId] = (acc[postId] || 0) + 1;
                return acc;
            }, {});

            const maxComments = Math.max(...Object.values(commentCounts));
            response = posts.filter(post => (commentCounts[post.id] || 0) === maxComments);
        } else {
            response = posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 5);
        }

        res.json(response);
    } catch (err) {
        console.error("Error fetching posts:", err);
        res.status(500).json({ error: "Unable to retrieve posts. Please try again later." });
    }
});

module.exports = router;
