const express = require("express");

const { getSales, postSales } = require('../controllers/sales');

const router = express.Router();

router.get('/',getSales);

router.post('/',postSales);


// export default router;
module.exports = router;