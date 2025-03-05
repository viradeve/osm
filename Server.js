// importing app
const path = require('path');
const app = require(path.join(__dirname, 'MainApp.js'));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});