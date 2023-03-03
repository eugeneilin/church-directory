# Church Directory App

OVERVIEW:

Built with a modern and simple look, the main idea of this web app is to view churches as a list as well as plotted on a map. Each individual church is clickable and takes you to a new page with more detailed information. Only admins have the rights to add, edit, and delete data through the admin panel.

TECHNICAL HIGHLIGHTS:

- Web pages in this app are served through Express, with EJS to dynamically generate HTML.
- The database lives on MongoDB Atlas, and is connected through Mongoose.
- Latest Bootstrap was used to create a simple but intuitive layout and design.
- Client-side validation as well as schema validation before uploading to database are only a few highlights of this project, along with the use of cookies, session, and flash messages.
- Authentication is done through Passport, images are uploaded to and served from Cloudinary, and the dynamic cluster map is done with Mapbox.
- Security concerns have been addressed by preventing Mongo injection, sanitizing HTML with JOI, hiding sensitive information from errors, cookies, and sessions, as well as securing the app using Helmet HTTP headers.

For Developer:
Connected apps to watch:

- Cloudinary
- MongoDB
- Mapbox
- Heroku
