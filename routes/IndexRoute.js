// importing necessary modules
const router = require("express").Router();

// setting the route
router.get("/", (req, res) => {
    res.send("Warning: MANES OSM");
});

// exporting the router
module.exports = router;
