// importing necessary modules
const router = require("express").Router();

// setting the route
router.get("/", (req, res) => {
    res.send("Simple reverse proxy by GrowPlus Community");
});

// exporting the router
module.exports = router;