if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const mongoose = require('mongoose');
const cities = require('./cities');
const { descriptors, places } = require('./sampleNames');
const { firstNames, lastNames } = require('./samplePastors');
const Church = require('../models/church');

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sampleNames = (array) => array[Math.floor(Math.random() * array.length)];

const samplePastors = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Church.deleteMany({});
  for (let i = 0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const church = new Church({
      title: `${sampleNames(descriptors)} ${sampleNames(places)}`,
      address: `${cities[random1000].city}, ${cities[random1000].state}`,
      images: [
        {
          url: 'https://res.cloudinary.com/eb23dksdfj9/image/upload/v1663254888/ChurchSearch/Church_kpx66h.jpg',
          filename: 'ChurchSearch/Church_kpx66h.jpg',
        },
      ],
      leadPastor: `Lead Pastor: ${samplePastors(firstNames)} ${samplePastors(lastNames)}`,
      phoneNumber: 1237890456,
      geometry: {
        type: 'Point',
        coordinates: [cities[random1000].longitude, cities[random1000].latitude],
      },
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium animi dolorum quaerat laborum. Distinctio necessitatibus cupiditate earum velit impedit suscipit commodi ratione, tempora in quasi blanditiis deserunt aut fugit ipsam facilis eaque? Nulla quibusdam odio, tempore debitis quis maiores corrupti unde eius eligendi soluta beatae saepe ratione qui quo. Quasi nesciunt dolorem dignissimos quibusdam doloribus fugit, praesentium, mollitia beatae unde totam ullam corporis. Modi sint possimus assumenda maxime? Dolorum excepturi eligendi et magnam nemo quas laboriosam harum molestiae dolores ratione illum.',
    });
    await church.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
