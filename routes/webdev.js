import express from "express";
import fs from "fs";

const router = express.Router();

// Route for fetching webdev data
router.get("/webdev", (req, res) => {
    try {
        const webdev = JSON.parse(fs.readFileSync("./data/webdev.json"));

        const webdevData = webdev.map((webdev) => ({
            id: webdev.id,
            title: webdev.title,
            subTitle: webdev.subTitle,
            mainImage: webdev.mainImage,
            date:webdev.date,
            workedWith:webdev.workedWith,
            gallery:webdev.gallery,
            videoThumbnail:webdev.videoThumbnail,
            video:webdev.video,
            description:webdev.description,
            link:webdev.link,
        }));

        res.send(webdevData);
    } catch (error) {
        console.error("Error reading or parsing webdev data:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Route for fetching gallery data
router.get("/webdev/:id/gallery", (req, res) => {
    try {
        const projects = JSON.parse(fs.readFileSync("./data/webdev.json"));

        const foundGallery = projects.find((project) => project.id === req.params.id);

        const galleryData = foundGallery.gallery.map((photos) => ({
            id: photos.id,
            description: photos.description,
            image: photos.image,
        }));

        if (foundGallery) {
            res.send(galleryData);  
        } else {
            res.status(404).send({ message: "Gallery not found" });
        }
    } catch (error) {
        console.error("Error reading or parsing gallery data:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

export default router;
