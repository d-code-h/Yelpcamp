const express     =   require("express"),
    router      =   express.Router(),
    Campground  =   require("../models/campground"),
    Comment =   require("../models/comment"),
    User    =   require("../models/user"),
    middleware  =   require("../middlewares/");

const   cloudinary = require("cloudinary").v2,
    { CloudinaryStorage } = require("multer-storage-cloudinary"),
    multer =  require("multer");


cloudinary.config({
    cloud_name: "david1",
    api_key: 442127769626262,
    api_secret: "qHovIL_CrkdNI2jGXM5VSPfHQR8"
});

//     transformation: [{ width: 500, height: 500, crop: "limit" }]

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'YelpCamp',
        allowedFormats: ["jpg", "png"]
        // public_id: (req, file) => 'computed-filename-using-request'
    }
});

const parser = multer({ storage: storage });


router.get("/", (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        }else{
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    });
});

router.post("/",middleware.isLoggedIn, parser.single('imageFile'), (req, res, next) => {
    req.body.title          =   req.sanitize(req.body.title);
    req.body.description    =   req.sanitize(req.body.description);

    if (((req.body.imageLink !== undefined) && (req.body.imageLink !== "")) && ((req.file !== undefined) && (req.file !== ""))){
        req.flash("error", "Sorry you can not submit two image for the campground. Either fill the image link and leave the image file blank or vice versa.");
        res.redirect("/campgrounds/new");
    }else if (((req.body.imageLink === undefined) || (req.body.imageLink === "")) && ((req.file === undefined) || (req.file === ""))){
        req.flash("error", "Sorry both image source can not be left empty. Please do fill one.");
        res.redirect("/campgrounds/new");
    } else if (((req.body.imageLink === undefined) || (req.body.imageLink === "")) && ((req.file !== undefined) && (req.file !== ""))){
        let newCampground = new Campground(
        {
            title: req.body.title,
            description: req.body.description,
            author: {
                id: req.user._id,
                username: req.user.username
            },

            image: req.file.path
        });
        newCampground.save((err, savedCampground) => {
            if (err){
                req.flash("error", err.message);
                res.redirect("back");
            }else {
                req.flash("success", "Campground successfully added.");
                res.redirect("/campgrounds");
            }
        });
    }else if (((req.body.imageLink !== undefined) && (req.body.imageLink !== "")) && ((req.file === undefined) || (req.file === ""))){
        req.body.imageLink      =   req.sanitize(req.body.imageLink);
        let newCampground = new Campground(
            {
                title: req.body.title,
                description: req.body.description,
                author: {
                    id: req.user._id,
                    username: req.user.username
                },
    
                image: req.body.imageLink
            });
            newCampground.save((err, savedCampground) => {
                if (err){
                    req.flash("error", err.message);
                    res.redirect("back");
                }else {
                    req.flash("success", "Campground successfully added.");
                    res.redirect("/campgrounds");
                }
            });
    }else {
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("/campgrounds/new");
    }
});
// middleware.isLoggedIn, 
router.get("/new", (req, res) => {
    res.render("campgrounds/new");
});

router.get("/:id", (req, res) => {
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        }else {
            User.findOne({username: "Administrator"}, (err, foundUser) => {
                if (err){
                    req.flash("error", "Something went wrong. Please try again.");
                    res.redirect("back");
                }else {
                    res.render("campgrounds/show", {campground: foundCampground, user: foundUser});   
                }
            });
        }
    });
});

router.get("/:id/edit", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        }else {
            res.render("campgrounds/edit", {campground: foundCampground});
        }
    })
});

router.put("/:id", middleware.checkCampgroundOwnership, parser.single('imageFile'), (req, res, next) => {
    req.body.title          =   req.sanitize(req.body.title);
    req.body.description    =   req.sanitize(req.body.description);

    if (((req.body.imageLink !== undefined) && (req.body.imageLink !== "")) && ((req.file !== undefined) && (req.file !== ""))){
        req.flash("error", "Sorry you can not submit two image for the campground. Either fill the image link and leave the image file blank or vice versa.");
        res.redirect("/campgrounds/new");
    }else if (((req.body.imageLink === undefined) || (req.body.imageLink === "")) && ((req.file === undefined) || (req.file === ""))){
        req.flash("error", "Sorry both image source can not be left empty. Please do fill one.");
        res.redirect("/campgrounds/new");
    } else if (((req.body.imageLink === undefined) || (req.body.imageLink === "")) && ((req.file !== undefined) && (req.file !== ""))){
        let editCampground = {
            title: req.body.title,
            description: req.body.description,
            author: {
                id: req.user._id,
                username: req.user.username
            },

            image: req.file.path
        };
        Campground.findByIdAndUpdate(req.params.id, editCampground, (err, updatedCampground) => {
            if (err){
                req.flash("error", "Something went wrong. Please try again.");
                res.redirect("back");
            }else {
                req.flash("success", "Campground successfully updated.");
                res.redirect("/campgrounds/" + req.params.id);
            }
        });
    }else if (((req.body.imageLink !== undefined) && (req.body.imageLink !== "")) && ((req.file === undefined) || (req.file === ""))){
        req.body.imageLink      =   req.sanitize(req.body.imageLink);
        let editCampground = {
                title: req.body.title,
                description: req.body.description,
                author: {
                    id: req.user._id,
                    username: req.user.username
                },
    
                image: req.body.imageLink
            };
            Campground.findByIdAndUpdate(req.params.id, editCampground, (err, updatedCampground) => {
                if (err){
                    req.flash("error", "Something went wrong. Please try again.");
                    res.redirect("back");
                }else {
                    req.flash("success", "Campground successfully updated.");
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
    }else {
        req.flash("error", "Something went wrong. Please try again.");
        res.redirect("/campgrounds/" + req.params.id);
    }
});

// router.put("/:id", middleware.checkCampgroundOwnership, (req, res) => {
//     let editedCampground = {
//             title: req.body.title,
//             description: req.body.description,
//             author: {
//                 id: req.user._id,
//                 username: req.user.username
//             },
//             imageFile: {
//                 data: fs.readFileSync(path.join(__dirname + '/../uploads/' + req.file.filename)),
//                 contentType: 'image/png'
//             },
//             imageLink: req.body.imageLink
//         };
//     Campground.findByIdAndUpdate(req.params.id, editedCampground, (err, updatedCampground) => {
//         if (err){
//             req.flash("error", err.message);
//             res.redirect("back");
//         }else {
//             req.flash("success", "Campground successfully updated.");
//             res.redirect("/campgrounds/" + req.params.id);
//         }
//     });
// });

router.delete("/:id", middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err, deletedCampground) => {
        if (err){
            req.flash("error", err.message);
            res.redirect("back");
        }else {
            req.flash("success", "Campground successfully removed.");
            res.redirect("/campgrounds");
        }
    })
});

module.exports  =   router;