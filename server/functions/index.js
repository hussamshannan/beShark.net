require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Slide = require("./model/slides");
const app = express();
const About = require("./model/aboutPages");
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", async (req, res) => {
  res.send("hi");
});
// MongoDB connection
mongoose
  .connect(process.env.MONGOODB)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup to store uploaded files temporarily
const upload = multer({ dest: "uploads/" }); // temp folder

// about Routes
app.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const slides = await About.find({ category });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/about", upload.single("img"), async (req, res) => {
  let uploadedImageId = null;

  try {
    const { topTitle, topSubtitle, sectionTitle, description, category } =
      req.body;

    if (!topTitle || !sectionTitle || !description) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    let imgUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        use_filename: true,
        unique_filename: false,
        folder: undefined,
      });
      uploadedImageId = result.public_id;
      imgUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const about = new About({
      topTitle,
      topSubtitle,
      sectionTitle,
      description,
      category,
      imgUrl,
    });

    await about.save();
    res.json(about);
  } catch (err) {
    if (uploadedImageId) await cloudinary.uploader.destroy(uploadedImageId);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: err.message });
  }
});
app.put("/about/:id", upload.single("img"), async (req, res) => {
  try {
    const { topTitle, topSubtitle, sectionTitle, description, category } =
      req.body;

    // Find existing document
    const existing = await About.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: "About entry not found" });
    }

    let update = {
      topTitle,
      topSubtitle,
      sectionTitle,
      description,
      category,
    };

    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (existing.imgUrl) {
        // Extract public ID from URL
        // Cloudinary URLs look like:
        // https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>.<ext>
        // We can parse public_id by removing prefix and suffix

        const parts = existing.imgUrl.split("/");
        const filenameWithExt = parts.pop(); // last segment is filename.ext
        const publicIdWithVersion = parts.pop() + "/" + filenameWithExt; // combine last two parts
        // Actually better to parse by removing base URL and extension:

        // Better approach:
        // Remove base URL and extension to get public_id:
        // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/myfolder/myimage.jpg
        // public_id: myfolder/myimage

        // So:
        const urlParts = existing.imgUrl.split("/");
        const lastSegment = urlParts.pop(); // "myimage.jpg"
        const publicId =
          urlParts.slice(7).join("/") + "/" + lastSegment.split(".")[0];
        // Note: urlParts.slice(7) skips "https:", "", "res.cloudinary.com", "<cloud_name>", "image", "upload", "v1234567890"

        // or more simply use regex:
        // This regex extracts public ID from the URL:
        // https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>.<ext>
        // group 1: public_id

        const regex = /\/upload\/v\d+\/(.+)\.[a-zA-Z]+$/;
        const match = existing.imgUrl.match(regex);
        if (match && match[1]) {
          const publicIdToDelete = match[1];
          await cloudinary.uploader.destroy(publicIdToDelete);
        }
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        use_filename: true,
        unique_filename: false,
      });
      update.imgUrl = result.secure_url;

      // Remove temp file
      fs.unlinkSync(req.file.path);
    }

    const updatedAbout = await About.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.json(updatedAbout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/about/:id", async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ error: "About not found" });

    // Optionally: delete image from Cloudinary
    const publicId = about.imgUrl.split("/").pop().split(".")[0];
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.warn("Cloudinary delete failed:", err.message);
    }

    await about.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Slide deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// whyus Routes
app.post("/why-us", upload.single("img"), async (req, res) => {
  let uploadedImageId = null;

  try {
    const { topTitle, topSubtitle, sectionTitle, description, category } =
      req.body;

    if (!topTitle || !sectionTitle || !description) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    let imgUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        use_filename: true,
        unique_filename: false,
        folder: undefined,
      });
      uploadedImageId = result.public_id;
      imgUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const about = new About({
      topTitle,
      topSubtitle,
      sectionTitle,
      description,
      category,
      imgUrl,
    });

    await about.save();
    res.json(about);
  } catch (err) {
    if (uploadedImageId) await cloudinary.uploader.destroy(uploadedImageId);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: err.message });
  }
});
app.put("/why-us/:id", upload.single("img"), async (req, res) => {
  try {
    const { topTitle, topSubtitle, sectionTitle, description, category } =
      req.body;

    // Find existing document
    const existing = await About.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: "About entry not found" });
    }

    let update = {
      topTitle,
      topSubtitle,
      sectionTitle,
      description,
      category,
    };

    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (existing.imgUrl) {
        // Extract public ID from URL
        // Cloudinary URLs look like:
        // https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>.<ext>
        // We can parse public_id by removing prefix and suffix

        const parts = existing.imgUrl.split("/");
        const filenameWithExt = parts.pop(); // last segment is filename.ext
        const publicIdWithVersion = parts.pop() + "/" + filenameWithExt; // combine last two parts
        // Actually better to parse by removing base URL and extension:

        // Better approach:
        // Remove base URL and extension to get public_id:
        // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/myfolder/myimage.jpg
        // public_id: myfolder/myimage

        // So:
        const urlParts = existing.imgUrl.split("/");
        const lastSegment = urlParts.pop(); // "myimage.jpg"
        const publicId =
          urlParts.slice(7).join("/") + "/" + lastSegment.split(".")[0];
        // Note: urlParts.slice(7) skips "https:", "", "res.cloudinary.com", "<cloud_name>", "image", "upload", "v1234567890"

        // or more simply use regex:
        // This regex extracts public ID from the URL:
        // https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>.<ext>
        // group 1: public_id

        const regex = /\/upload\/v\d+\/(.+)\.[a-zA-Z]+$/;
        const match = existing.imgUrl.match(regex);
        if (match && match[1]) {
          const publicIdToDelete = match[1];
          await cloudinary.uploader.destroy(publicIdToDelete);
        }
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        use_filename: true,
        unique_filename: false,
      });
      update.imgUrl = result.secure_url;

      // Remove temp file
      fs.unlinkSync(req.file.path);
    }

    const updatedAbout = await About.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.json(updatedAbout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/why-us/:id", async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ error: "About not found" });

    // Optionally: delete image from Cloudinary
    const publicId = about.imgUrl.split("/").pop().split(".")[0];
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.warn("Cloudinary delete failed:", err.message);
    }

    await about.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Slide deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// previous-works Routes
app.post("/previous-works", upload.single("img"), async (req, res) => {
  let uploadedImageId = null;

  try {
    const { topTitle, topSubtitle, sectionTitle, description, category } =
      req.body;

    if (!topTitle || !sectionTitle || !description) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    let imgUrl = "";
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        use_filename: true,
        unique_filename: false,
        folder: undefined,
      });
      uploadedImageId = result.public_id;
      imgUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const about = new About({
      topTitle,
      topSubtitle,
      sectionTitle,
      description,
      category,
      imgUrl,
    });

    await about.save();
    res.json(about);
  } catch (err) {
    if (uploadedImageId) await cloudinary.uploader.destroy(uploadedImageId);
    if (req.file && fs.existsSync(req.file.path)) fs.unlinkSync(req.file.path);
    res.status(500).json({ error: err.message });
  }
});
app.put("/previous-works/:id", upload.single("img"), async (req, res) => {
  try {
    const { topTitle, topSubtitle, sectionTitle, description, category } =
      req.body;

    // Find existing document
    const existing = await About.findById(req.params.id);

    if (!existing) {
      return res.status(404).json({ error: "About entry not found" });
    }

    let update = {
      topTitle,
      topSubtitle,
      sectionTitle,
      description,
      category,
    };

    if (req.file) {
      // Delete old image from Cloudinary if exists
      if (existing.imgUrl) {
        // Extract public ID from URL
        // Cloudinary URLs look like:
        // https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>.<ext>
        // We can parse public_id by removing prefix and suffix

        const parts = existing.imgUrl.split("/");
        const filenameWithExt = parts.pop(); // last segment is filename.ext
        const publicIdWithVersion = parts.pop() + "/" + filenameWithExt; // combine last two parts
        // Actually better to parse by removing base URL and extension:

        // Better approach:
        // Remove base URL and extension to get public_id:
        // Example: https://res.cloudinary.com/demo/image/upload/v1234567890/myfolder/myimage.jpg
        // public_id: myfolder/myimage

        // So:
        const urlParts = existing.imgUrl.split("/");
        const lastSegment = urlParts.pop(); // "myimage.jpg"
        const publicId =
          urlParts.slice(7).join("/") + "/" + lastSegment.split(".")[0];
        // Note: urlParts.slice(7) skips "https:", "", "res.cloudinary.com", "<cloud_name>", "image", "upload", "v1234567890"

        // or more simply use regex:
        // This regex extracts public ID from the URL:
        // https://res.cloudinary.com/<cloud_name>/image/upload/v<version>/<public_id>.<ext>
        // group 1: public_id

        const regex = /\/upload\/v\d+\/(.+)\.[a-zA-Z]+$/;
        const match = existing.imgUrl.match(regex);
        if (match && match[1]) {
          const publicIdToDelete = match[1];
          await cloudinary.uploader.destroy(publicIdToDelete);
        }
      }

      // Upload new image
      const result = await cloudinary.uploader.upload(req.file.path, {
        use_filename: true,
        unique_filename: false,
      });
      update.imgUrl = result.secure_url;

      // Remove temp file
      fs.unlinkSync(req.file.path);
    }

    const updatedAbout = await About.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.json(updatedAbout);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/previous-works/:id", async (req, res) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) return res.status(404).json({ error: "About not found" });

    // Optionally: delete image from Cloudinary
    const publicId = about.imgUrl.split("/").pop().split(".")[0];
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.warn("Cloudinary delete failed:", err.message);
    }

    await about.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Slide deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// slides Routes
app.post("/slides", upload.single("img"), async (req, res) => {
  let uploadedImageId = null;

  try {
    const { title, desc, category } = req.body;

    if (!req.file || !title || !desc) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Upload to Cloudinary from local file
    const result = await cloudinary.uploader.upload(req.file.path, {
      use_filename: true,
      unique_filename: false,
      folder: undefined, // ← no folder
    });

    uploadedImageId = result.public_id; // Save for deletion if needed

    // Remove file from temp folder
    fs.unlinkSync(req.file.path);

    const slide = new Slide({
      title,
      desc,
      imgUrl: result.secure_url,
      category,
    });
    await slide.save();

    res.json(slide);
  } catch (err) {
    // Remove uploaded image from Cloudinary if it exists
    if (uploadedImageId) {
      await cloudinary.uploader.destroy(uploadedImageId);
    }

    // Remove file from temp folder if it still exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({ error: err.message });
  }
});
app.get("/slides/category/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const slides = await Slide.find({ category });
    res.json(slides);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put("/slides/:id", upload.single("img"), async (req, res) => {
  try {
    const { title, desc, category } = req.body;
    let update = { title, desc, category };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        use_filename: true,
        unique_filename: false,
      });
      update.imgUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const updatedSlide = await Slide.findByIdAndUpdate(req.params.id, update, {
      new: true,
    });

    res.json(updatedSlide);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.delete("/slides/:id", async (req, res) => {
  try {
    const slide = await Slide.findById(req.params.id);
    if (!slide) return res.status(404).json({ error: "Slide not found" });

    // Optionally: delete image from Cloudinary
    const publicId = slide.imgUrl.split("/").pop().split(".")[0];
    try {
      await cloudinary.uploader.destroy(publicId);
    } catch (err) {
      console.warn("Cloudinary delete failed:", err.message);
    }

    await Slide.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Slide deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
