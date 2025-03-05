// importing necessary modules
const router = require("express").Router();
const fetch = require("node-fetch");
const https = require("https");

// bypass ssl
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const agent = new https.Agent({
    rejectUnauthorized: false,
});

// setting the route
router.get("/:ip/cache/*", async (req, res, next) => {
    // check if ip is an ip
    if (!req.params.ip.match(/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)) {
        return next();
    }

    try {
        delete req.headers['content-length'];
        delete req.headers['transfer-encoding'];
        req.headers.host = 'www.growtopia1.com';
        const options = {
            method: req.method,
            headers: req.headers,
            agent: agent,
        };

        if (req.method === 'POST' || req.method === 'PUT') {
            options.body = JSON.stringify(req.body);
        }

        const response = await fetch('https:/' + req.originalUrl, options);

        res.status(response.status);
        // Copy headers carefully
        for (const [key, value] of response.headers) {
            // Skip problematic headers
            if (key.toLowerCase() !== 'content-length' && 
                key.toLowerCase() !== 'transfer-encoding') {
                res.setHeader(key, value);
            }
        }

        response.body.pipe(res);
    } catch (error) {
        console.error('Error:', error);
        res.status(200).send('Internal Server Error');
    }
});

// exporting the router
module.exports = router;