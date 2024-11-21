import express from "express";
import fs from "fs";

const router = express.Router();

// Route for fetching AR data
router.get("/ar", (req, res) => {
    try {
        const ar = JSON.parse(fs.readFileSync("./data/ar.json"));

        const arData = ar.map((ar) => ({
            id: ar.id,
            title: ar.title,
            subTitle: ar.subTitle,
            mainImage: ar.mainImage,
            date:ar.date,
            workedWith:ar.workedWith,
            gallery:ar.gallery,
            videoThumbnail:ar.videoThumbnail,
            video:ar.video,
            description:ar.description,
        }));

        res.send(arData);
    } catch (error) {
        console.error("Error reading or parsing ar data:", error);
        res.status(500).send({ message: "Internal Server Error" });
    }
});

// Route for fetching gallery data
router.get("/ar/:id/gallery", (req, res) => {
    try {
        const projects = JSON.parse(fs.readFileSync("./data/ar.json"));

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
