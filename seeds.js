// ==================================================================
                    // COMMENT EDIT TEMPLATE
// ==================================================================
// ==================
// Integrate Package and Models
// ==================
const   mongoose        =   require("mongoose"),
        Campground      =   require("./models/campground"),
        Comment         =   require("./models/comment");

// ==================
// Demo Data
// ==================
var data = [
    {
        name: "David",
        image: "/imgs/2.jpg",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate saepe illo odio culpa? Similique reiciendis accusantium ducimus omnis vel aspernatur, facere numquam ad corporis dicta minima nobis quas repudiandae iure"
    },
    {
        name: "Elizabeth",
        image: "/imgs/3.jpg",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate saepe illo odio culpa? Similique reiciendis accusantium ducimus omnis vel aspernatur, facere numquam ad corporis dicta minima nobis quas repudiandae iure"
    },
    {
        name: "Emmanuel",
        image: "/imgs/4.jpg",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate saepe illo odio culpa? Similique reiciendis accusantium ducimus omnis vel aspernatur, facere numquam ad corporis dicta minima nobis quas repudiandae iure"
    },
    {
        name: "Esther",
        image: "/imgs/5.jpg",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate saepe illo odio culpa? Similique reiciendis accusantium ducimus omnis vel aspernatur, facere numquam ad corporis dicta minima nobis quas repudiandae iure"
    },
    {
        name: "Ezekiel",
        image: "/imgs/6.jpg",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate saepe illo odio culpa? Similique reiciendis accusantium ducimus omnis vel aspernatur, facere numquam ad corporis dicta minima nobis quas repudiandae iure"
    },
    {
        name: "Unknown 1",
        image: "/imgs/7.jpg",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate saepe illo odio culpa? Similique reiciendis accusantium ducimus omnis vel aspernatur, facere numquam ad corporis dicta minima nobis quas repudiandae iure"
    },
    {
        name: "Unknown 2",
        image: "/imgs/8.jpg",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate saepe illo odio culpa? Similique reiciendis accusantium ducimus omnis vel aspernatur, facere numquam ad corporis dicta minima nobis quas repudiandae iure"
    },
    {
        name: "Unknown 3",
        image: "/imgs/9.jpg",
        description: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cupiditate saepe illo odio culpa? Similique reiciendis accusantium ducimus omnis vel aspernatur, facere numquam ad corporis dicta minima nobis quas repudiandae iure"
    }
];

// ==================
// seedDB Function
// ==================
function seedDB(){
    // empty campgrounds in DB
    Campground.remove({}, function(err){
        if (err){
            // error! outpu error in console
            console.log(err);
        }else {
            // success! create demo campgrounds
            data.forEach(function(campground){
                Campground.create({
                    name: campground.name,
                    image: campground.image,
                    description: campground.description
                }, function(err, createdCampground){
                    if (err){
                        // error! show error in console
                        console.log(err);
                    }else {
                        // after campgrounds creation, create demo comment
                        console.log(createdCampground.name + " " + "created");
                        Comment.create({
                            text: "Testing the comment section!",
                            author: "David"
                        }, function(err, createdComment){
                            if (err){
                                // error! show error in console
                                console.log(err);
                            }else {
                                // success! integrate comment into campground
                                createdCampground.comments.push(createdcomment);
                                createdCampground.save();
                                console.log("Comment created!!");
                            }
                        });
                    }
                });
            });
        }
    })
}

// ==================
// Export Module
// ==================
module.exports = seedDB;