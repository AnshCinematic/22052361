const express = require('express');
const axios = require('axios');

const router = express.Router();
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQzNjA1MTI2LCJpYXQiOjE3NDM2MDQ4MjYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjdiM2U2NTQ5LTJiM2QtNGI5NC1iYWRhLTEzMmMzNmMxNWM5NyIsInN1YiI6IjIyMDUyMzYxQGtpaXQuYWMuaW4ifSwiZW1haWwiOiIyMjA1MjM2MUBraWl0LmFjLmluIiwibmFtZSI6IkFuc2ggU3JpdmFzdGF2YSIsInJvbGxObyI6IjIyMDUyMzYxIiwiYWNjZXNzQ29kZSI6Im53cHdyWiIsImNsaWVudElEIjoiN2IzZTY1NDktMmIzZC00Yjk0LWJhZGEtMTMyYzM2YzE1Yzk3IiwiY2xpZW50U2VjcmV0IjoiVEV1c3RSSEN1ZkFTS1ZjQiJ9.CbjVwSNY4aalMDJF87qJGQlFbfXrmeTZvXSO-I5eCnk";

router.get('/:userId/posts', async (req, res) => {
    try {
        const { userId } = req.params;

        const config = {
            headers: {
                Authorization: `Bearer ${AUTH_TOKEN}`,  
                "Content-Type": "application/json"
            }
        };

        console.log("Fetching posts for user:", userId); 

        const postResponse = await axios.get(`http://20.244.56.144/test/users/${userId}/posts`, config);

        res.json(postResponse.data);
    } catch (error) {
        console.error("Error retrieving posts:", error.response?.data || error.message);
        res.status(500).json({ error: "Unable to fetch user posts", details: error.response?.data });
    }
});

module.exports = router;