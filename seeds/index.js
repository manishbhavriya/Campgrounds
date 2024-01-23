const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/test').
  catch(error => handleError(error));


mongoose.connection.on('error', err => {
    logError(err);
  });

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '659d0d01de5dd71e95b82261',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dgomarh8l/image/upload/v1705471700/YelpCamp/arzod24ikg3tnulybjsp.jpg',
                    filename: 'YelpCamp/arzod24ikg3tnulybjsp'
                    
                },
                {
                    url:'https://res.cloudinary.com/dgomarh8l/image/upload/v1705471025/YelpCamp/ew9stjjvdzh5uueeamfx.jpg',
                    filename:'YelpCamp/ew9stjjvdzh5uueeamfx'
                }
               
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})