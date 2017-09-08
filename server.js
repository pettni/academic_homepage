const express = require('express')
const app = express()

app.use(require('connect-livereload')({
    port: 35729
}));

app.use(express.static('public'));

app.listen(3000, function () {
  console.log('Now listening on port 3000!')
})
