import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const apiKey = "";
const channelId = "GoogleDevelopers";
const apiUrl = "https://www.googleapis.com/youtube/v3";

app.get("/youtubeData", async (req, res) => {
  try {
    const url = `${apiUrl}/channels?part=snippet,contentDetails,statistics&forUsername=${channelId}&key=${apiKey}`;

    const response = await axios.get(url);

    const channelData = response.data.items[0];

    const resData = {
      channelName: channelData.snippet.title,
      description: channelData.snippet.description,
      Followers: channelData.statistics.subscriberCount,
      AverageView:
        parseInt(channelData.statistics.viewCount) /
        parseInt(channelData.statistics.videoCount),
      // AverageLikes: 0,
      // AverageComments: 0,
      // Frequencyofposting: 0,
    };

    res.json(resData);
  } catch (error) {
    console.error("Error fetching data from YouTube API:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
