// Require models
const   Campground  =   require("./models/campground"),
        Comment     =   require("./models/comment"),
        User        =   require("./models/user");

// Sample data
const sampleData = [
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

async function seedDB(){
    try {
        await Campground.deleteMany({});
        await Comment.deleteMany({});
        await User.deleteMany({});
        // sampleData.forEach(function async(data){
        //     // Create new campground
        //     let newCampground = new Campground({
        //         title: data.title,
        //         image: data.image,
        //         description: data.description
        //     });
        //     // Create an store new comment
        //     await Comment.create({
        //         text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus voluptatem, minima quod delectus aut quasi modi illum deserunt tenetur dolore, cumque reprehenderit, rem nulla deleniti. Eius nobis neque fugiat ipsum."
        //     });
        //     await newCampground.comments.push(createdComment);
        //     await newCampground.save();
        //     console.log("Admin Added New Campground!");
        // });

    }catch(err){
        console.log(err);
    }
}

// Export module
module.exports = seedDB;