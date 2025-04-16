import express from "express";
import fs from "fs";

const router = express.Router();

// Route for fetching airobotics data
router.get("/airobotics", (req, res) => {
    try {
        const airobotics = JSON.parse(fs.readFileSync("./data/airobotics.json"));

        const airoboticsData = airobotics.map((airobotics) => ({
            id: airobotics.id,
            title: airobotics.title,
            subTitle: airobotics.subTitle,
            mainImage: airobotics.mainImage,
            date:airobotics.date,
            workedWith:airobotics.workedWith,
            gallery:airobotics.gallery,
            videoThumbnail:airobotics.videoThumbnail,
            video:airobotics.video,
            description:airobotics.description,
        }));

        res.send(airoboticsData);
    } catch (error) {
        console.error("Error reading or parsing airobotics data:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Route for fetching gallery data
router.get("/airobotics/:id/gallery", (req, res) => {
    try {
        const projects = JSON.parse(fs.readFileSync("./data/airobotics.json"));

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
