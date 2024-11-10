import express from "express";
import fs from "fs";

const router = express.Router();

// Route for fetching architecture data
router.get("/architecture", (req, res) => {
    try {
        const architecture = JSON.parse(fs.readFileSync("./data/architecture.json"));

        const architectureData = architecture.map((architecture) => ({
            id: architecture.id,
            title: architecture.title,
            subTitle: architecture.subTitle,
            mainImage: architecture.mainImage,
            date:architecture.date,
            workedWith:architecture.workedWith,
            gallery:architecture.gallery,
            videoThumbnail:architecture.videoThumbnail,
            video:architecture.video,
            description:architecture.description,
        }));

        res.send(architectureData);
    } catch (error) {
        console.error("Error reading or parsing architecture data:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Route for fetching gallery data
router.get("/architecture/:id/gallery", (req, res) => {
    try {
        const projects = JSON.parse(fs.readFileSync("./data/architecture.json"));

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
