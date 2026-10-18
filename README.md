# Wanderlust

A full-stack travel listings web app, inspired by Airbnb. Users can browse stays, add their own listings with photos, and leave reviews. This was my first full-stack project.

## Features
- Browse, create, edit, and delete listings
- Image upload for listings (Cloudinary)
- User sign up, login, and logout (Passport)
- Reviews on every listing
- Maps for each listing location (Mapbox)
- Server-side validation with Joi and custom error handling
- Sessions stored in MongoDB Atlas
- Seed script that geocodes sample listings and assigns them a demo owner

## Tech
Node.js, Express, MongoDB, Mongoose, EJS, Passport, Cloudinary, Mapbox, Joi

## Project structure

| Folder / File | Purpose |
| `app.js` | App setup, sessions, authentication, and routes |
| `models/` | Mongoose schemas: `listing`, `review`, `user` |
| `routes/` | Express routers for listings, reviews, and users |
| `controllers/` | Route logic for listings, reviews, and users |
| `views/` | EJS templates (`listings/`, `users/`, `layouts/`, `includes/`) |
| `utilities/` | `ExpressError` and `wrapAsync` helpers |
| `schema.js` | Joi validation schemas |
| `middleware.js` | Custom middleware |
| `cloudConfig.js` | Cloudinary configuration |
| `init/` | Script to seed sample listings |
| `public/` | Static CSS and JavaScript |

## Routes

| Path | Purpose |
| `/listings` | Listings: view, create, edit, delete |
| `/listings/:id/reviews` | Reviews for a listing |
| `/` | User sign up, login, and logout |

## Setup

1. Clone the repo and install packages:

        git clone https://github.com/MuhammadHilal072/Wanderlust.git
        cd Wanderlust
        npm install

2. Create a `.env` file in the project root (see `.env.example`):

        ATLASDB_URL=
        SECRET=
        CLOUD_NAME=
        CLOUD_API_KEY=
        CLOUD_API_SECRET=
        MAP_TOKEN=

   | Variable | What it is |
   | `ATLASDB_URL` | MongoDB Atlas connection string |
   | `SECRET` | Any long random string, used to sign session cookies |
   | `CLOUD_NAME`, `CLOUD_API_KEY`, `CLOUD_API_SECRET` | Cloudinary credentials for image uploads |
   | `MAP_TOKEN` | Mapbox access token for maps |

3. (Optional) Seed sample listings. This needs `ATLASDB_URL` and `MAP_TOKEN` in `.env`:

        node init/index.js

4. Start the app:

        node app.js

5. Open http://localhost:8080

## Security note
Secrets are never committed. All keys are read from environment variables, and `.env` is listed in `.gitignore`.

## Author
Muhammad Hilal