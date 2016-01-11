# URL Shortener Microservice

# Instructions:
- User can pass a URL as a parameter and user will receive a shortened URL in the JSON response.
- When user visits that shortened URL, it will redirect user to the original link.

# Example usage:
`http://localhost:9000/api/shortener/newUrl/https://www.google.com`
`http://localhost:9000/api/shortener/newUrl/http://freecodecamp.com/news`

# Example output:
`{ "original_url": "http://freecodecamp.com/news", "short_url": "http://localhost:9000/4" }`

# Project Details

This project was generated with the [Angular Full-Stack Generator](https://github.com/DaftMonk/generator-angular-fullstack) version 3.2.0.

## Getting Started

### Prerequisites

- [Git](https://git-scm.com/)
- [Node.js and npm](nodejs.org) Node ^4.2.3, npm ^2.14.7
- [Bower](bower.io) (`npm install --global bower`)
- [Grunt](http://gruntjs.com/) (`npm install --global grunt-cli`)
- [MongoDB](https://www.mongodb.org/) - Keep a running daemon with `mongod`

### Developing

1. Run `npm install` to install server dependencies.

2. Run `bower install` to install front-end dependencies.

3. Run `mongod` in a separate shell to keep an instance of the MongoDB Daemon running

4. Run `grunt serve` to start the development server. It should automatically open the client in your browser when ready.

## Build & development

Run `grunt build` for building and `grunt serve` for preview.

## Testing

Running `npm test` will run the unit tests with karma.
