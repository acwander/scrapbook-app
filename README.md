# Memories

### Live link: https://infinite-hollows-42785.herokuapp.com/scrapbook

# Project Description

This application is a digital scrapbook for users to have a place to digitally store memories. Memories can include images, descriptions, and journal entries. The user has the ability to create new books, view their created books, add/edit their books, and remove unwanted entries or entire books.

# More Ideas

- Custom user sessions with log in/log out functionality and restrictions when a user is not logged in.
- Add page numbers to users scrapbooks to allow users to set the order of the pages.
- Drag and drop functionality for the main scrapbook page for sorting.

# Built With

- JavaScript
- Node.js
- MongoDB/Mongoose
- Express.js
- EJS
- Bootstrap

# Issues and Resolutions

## Roadblocks

- Settings a default string for image in the schema does not pass through to the database and it ends up with an empty image. For the time being, I put a value in the image as a placeholder.
- When creating/editing scrapbook pages, the added or edited page goes onto the book as the last page because it is being removed and re-pushed.

## Wins

- Getting two models to work together, being able to add entries to the scrapbooks model and display as a carousel.
