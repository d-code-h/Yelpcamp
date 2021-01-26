var Campground  =   require("./models/campground"),
    Comment =   require("./models/comment"),
    User    =   require("./models/user");

var sampleData = [
    {
        title: "First Man",
        image: "/images/unsplash1.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptatem, minima quod delectus aut quasi modi illum deserunt tenetur dolore, cumque reprehenderit, rem nulla deleniti. Eius nobis neque fugiat ipsum."
    },
    {
        title: "Second Man",
        image: "/images/unsplash2.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptatem, minima quod delectus aut quasi modi illum deserunt tenetur dolore, cumque reprehenderit, rem nulla deleniti. Eius nobis neque fugiat ipsum."
    },
    {
        title: "Third Man",
        image: "/images/unsplash3.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptatem, minima quod delectus aut quasi modi illum deserunt tenetur dolore, cumque reprehenderit, rem nulla deleniti. Eius nobis neque fugiat ipsum."
    },
    {
        title: "Fourth Man",
        image: "/images/unsplash4.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptatem, minima quod delectus aut quasi modi illum deserunt tenetur dolore, cumque reprehenderit, rem nulla deleniti. Eius nobis neque fugiat ipsum."
    },
    {
        title: "Fifth Man",
        image: "/images/unsplash5.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptatem, minima quod delectus aut quasi modi illum deserunt tenetur dolore, cumque reprehenderit, rem nulla deleniti. Eius nobis neque fugiat ipsum."
    },
    {
        title: "Sixth Man",
        image: "/images/unsplash6.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptatem, minima quod delectus aut quasi modi illum deserunt tenetur dolore, cumque reprehenderit, rem nulla deleniti. Eius nobis neque fugiat ipsum."
    },
    {
        title: "Seventh Man",
        image: "/images/unsplash3.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptatem, minima quod delectus aut quasi modi illum deserunt tenetur dolore, cumque reprehenderit, rem nulla deleniti. Eius nobis neque fugiat ipsum."
    },
    {
        title: "Eighth Man",
        image: "/images/unsplash5.jpg",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptatem, minima quod delectus aut quasi modi illum deserunt tenetur dolore, cumque reprehenderit, rem nulla deleniti. Eius nobis neque fugiat ipsum."
    }
];

function seedDB(){
    Campground.deleteMany({}, function(err, removedCampgrounds){
        if (err){
            console.log(err.message);
        }else {
            Comment.deleteMany({}, function(err, removedComments){
                if (err){
                    console.log(err.message);
                }else {
                    User.deleteMany({}, (err, removedUsers) => {
                        if (err){
                            console.log(err.message);
                        }else {
                            // sampleData.forEach(function(data){
                            //     var newCampground = new Campground({
                            //         title: data.title,
                            //         image: data.image,
                            //         description: data.description
                            //     });
                            //     Comment.create({
                            //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptatem, minima quod delectus aut quasi modi illum deserunt tenetur dolore, cumque reprehenderit, rem nulla deleniti. Eius nobis neque fugiat ipsum."
                            //     }, function(err, createdComment){
                            //         if (err){
                            //             console.log(err.message);
                            //         }else {
                            //             newCampground.comments.push(createdComment);
                            //             newCampground.save(function(err, savedCampground){
                            //                 if (err){
                            //                     console.log(err.message);
                            //                 }else {
                            //                     console.log("Admin Added New Campground!");
                            //                 }
                            //             });
                            //         }
                            //     })
                            // });
                        }
                    })
                }
            });
        }
    });
}

module.exports = seedDB;