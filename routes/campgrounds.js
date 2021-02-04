// Require Packages
const   express     =   require("express"),
        router      =   express.Router(),
                // models
        Campground  =   require("../models/campground"),
        Comment     =   require("../models/comment"),
        User        =   require("../models/user"),
        middleware  =   require("../middlewares/"),
                // image
        cloudinary  = require("cloudinary").v2,
        upload      = require("../utils/cloudinary");


// Index Get
router.get("/", async(req, res) => {
    try {
        // find all campgrounds and redirect to index 
        let campgrounds = await Campground.find({});
        res.render("campgrounds/index", {campgrounds: campgrounds});
    
    }catch(err){
        // Error handling
        console.log(err);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("back");
    }
});

// Index Post
router.post("/",middleware.isLoggedIn, upload.single("imageFile"), async(req, res) => {
    try {
        // Sanitize data
        req.body.title          =   req.sanitize(req.body.title);
        req.body.description    =   req.sanitize(req.body.description);
        req.body.imageLink      =   req.sanitize(req.body.imageLink);

        // Store image for use
        const result = req.file;

        // Ensuring proper validation
        if (((req.body.imageLink !== undefined) && (req.body.imageLink !== "")) && ((req.file !== undefined) && (req.file !== ""))){
            // Error when both image field are empty
            req.flash("error", "Sorry you can not submit two image for the campground. Either fill the image link and leave the image file blank or vice versa.");
            res.redirect("/campgrounds/new");

        }else if (((req.body.imageLink === undefined) || (req.body.imageLink === "")) && ((req.file === undefined) || (req.file === ""))){
            // Error when both image field are fill
            req.flash("error", "Sorry both image source can not be left empty. Please do fill one.");
            res.redirect("/campgrounds/new");

        } else if (((req.body.imageLink === undefined) || (req.body.imageLink === "")) && ((req.file !== undefined) && (req.file !== ""))){
            // creating new campground
            let newCampground = new Campground({
                title: req.body.title,
                description: req.body.description,
                author: {
                    id: req.user._id,
                    username: req.user.username
                },
                image: {
                    src: result.path,
                    id: result.filename
                }
            });
            // save campground and redirect
            await newCampground.save();
            req.flash("success", "Campground successfully added.");
            res.redirect("/campgrounds");

        }else if (((req.body.imageLink !== undefined) && (req.body.imageLink !== "")) && ((req.file === undefined) || (req.file === ""))){
            // creating new campground
            let newCampground = new Campground({
                title: req.body.title,
                description: req.body.description,
                author: {
                    id: req.user._id,
                    username: req.user.username
                },
                image: {
                    src: req.body.imageLink,
                    id: ""
                }
            });
            // save campground and redirect
            await newCampground.save();
            req.flash("success", "Campground successfully added.");
            res.redirect("/campgrounds");
        }
        
    } catch (err) {
        // Error handling
        console.log(err);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("back");
    }
});

// New Campground GET
router.get("/new", middleware.isLoggedIn, async(req, res) => {
    res.render("campgrounds/new");
});

// Show Campground GET
router.get("/:id", async(req, res) => {
    try {
        // find campground and user then render show page
        let foundCampground = await Campground.findById(req.params.id).populate("comments").exec();
        let foundUser = await User.findOne({username: "Administrator"});
        res.render("campgrounds/show", {campground: foundCampground, user: foundUser});   
    
    }catch(err){
        // Error handling
        console.log(err);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("back");
    }
});

// Edit CAmpground GET
router.get("/:id/edit", middleware.checkCampgroundOwnership, async(req, res) => {
    try {
        // Find campground
        let foundCampground = await Campground.findById(req.params.id);
        res.render("campgrounds/edit", {campground: foundCampground});
    
    }catch(err){
        // Error handling
        console.log(err);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("back");
    }
});

// Update CAmpground PUT
router.put("/:id", middleware.checkCampgroundOwnership, upload.single("newImageFile"), async(req, res) => {
    try {
        // sanitize data
        req.body.newTitle          =   req.sanitize(req.body.newTitle);
        req.body.newDescription    =   req.sanitize(req.body.newDescription);
        req.body.newImageLink      =   req.sanitize(req.body.newImageLink);

        // Store image for use
        const result = req.file;
        // find campground        
        let campground = await Campground.findById(req.params.id);

        // Ensuring prpoer validation
        if (((req.body.newImageLink !== undefined) && (req.body.newImageLink !== "")) && ((result !== undefined) && (result !== ""))){
            // Error when the two image field is filled
            req.flash("error", "Sorry you can not submit two image for the campground. Either fill the image link and leave the image file blank or vice versa.");
            res.redirect("/campgrounds/" + req.params.id + "/edit");

        }else if (((req.body.newImageLink === undefined) || (req.body.newImageLink === "")) && ((result === undefined) || (result === ""))){
            // Error when the two image filed is empty
            req.flash("error", "Sorry both image source can not be left empty. Please do fill one.");
            res.redirect("/campgrounds/" + req.params.id + "/edit");

        } else if (((req.body.newImageLink === undefined) || (req.body.newImageLink === "")) && ((result !== undefined) && (result !== ""))){
            // Delete image from cloudinary
            if (campground.image.id !== ""){
                await cloudinary.uploader.destroy(campground.image.id);
            }
            // Edited data info
            let editedCampground = {
                title: req.body.newTitle || campground.title,
                description: req.body.newDescription || campground.description,
                author: {
                    id: req.user._id || campground.author.id,
                    username: req.user.username || campground.author.username
                },
                image: {
                    src: result.path || campground.image.src,
                    id: result.filename || campground.image.id
                }
            };

            // Update info
            campground = await Campground.findByIdAndUpdate(req.params.id, editedCampground, {new: true});
            req.flash("success", "Campground successfully updated.");
            res.redirect("/campgrounds/" + req.params.id);

        }else if (((req.body.newImageLink !== undefined) && (req.body.newImageLink !== "")) && ((result === undefined) || (result === ""))){            
            // Delete image from cloudinary
            if (campground.image.id !== ""){
                await cloudinary.uploader.destroy(campground.image.id);
            }
            // Edited data info
            let editedCampground = {
                title: req.body.newTitle,
                description: req.body.newDescription,
                author: {
                    id: req.user._id,
                    username: req.user.username
                },
                image: {
                    src: req.body.newImageLink,
                    id: ""
                }
            };

            // Update info
            await Campground.findByIdAndUpdate(req.params.id, editedCampground, {new: true});         
            req.flash("success", "Campground successfully updated.");
            res.redirect("/campgrounds/" + req.params.id);

        }

    } catch (err) {
        // Error handling
        console.log(err);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("back"); // "/campgrounds/" + req.params.id
    }
});

// Delete Campground DELETE
router.delete("/:id", middleware.checkCampgroundOwnership, async(req, res) => {
    try {
        // Find campground by id
        let campground = await Campground.findById(req.params.id);
        // Delete image from cloudinary
        if (campground.image.id !== "") {
            await cloudinary.uploader.destroy(campground.image.id);
        }
        // Delete campground from DB
        await campground.remove();
        // redirect to list of campgrounds
        req.flash("success", "Campground successfully removed.");
        res.redirect("/campgrounds");
    }
    catch (err){
        // Error handling
        console.log(err);
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("back");
    }
});

// Export module
module.exports  =   router;