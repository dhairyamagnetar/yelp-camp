const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper')
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected")
})

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "642ff314999a3ffb07e79686",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dz4waza91/image/upload/v1681037195/YelpCamp/eo7csl7kdp64r0q1ffzr.jpg',
                    filename: 'YelpCamp/eo7csl7kdp64r0q1ffzr'
                },
                {
                    url: 'https://res.cloudinary.com/dz4waza91/image/upload/v1681037195/YelpCamp/ncxbui0sh9g36xvip2yb.jpg',
                    filename: 'YelpCamp/ncxbui0sh9g36xvip2yb'
                },
                {
                    url: 'https://res.cloudinary.com/dz4waza91/image/upload/v1681037196/YelpCamp/xf6l9n7unze2qkebuuns.jpg',
                    filename: 'YelpCamp/xf6l9n7unze2qkebuuns'
                },
                {
                    url: 'https://res.cloudinary.com/dz4waza91/image/upload/v1681037196/YelpCamp/vyveusbbxwc2vewhi86r.jpg',
                    filename: 'YelpCamp/vyveusbbxwc2vewhi86r'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, suscipit perferendis itaque perspiciatis at porro deleniti esse cumque rem doloremque cupiditate voluptatibus distinctio tempore vitae iusto ex, quo omnis temporibus.',
            price
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    })