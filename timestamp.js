const express = require('express');
const router = express.Router();

const processTimeStamp = (req, res) => {
  const { date_string } = req.params;
  
  let date = new Date();
    console.log(date)

    if (/^\d*$/.test(req.params.date_string)) {
    date.setTime(req.params.date_string);
  } else {
    date = new Date(req.params.date_string);
  }

  if (!date.getTime()) {
    return res.status(400).json({
      error: 'Invalid Date'
    });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
};

// const timestampController = require('./controllers/timestampController');

router.get('/:date_string', processTimeStamp);
router.get("/", (req, res) => {
  // res.json({ unix: Date.now(), utc: Date() });
    res.json({
    unix: Date.now(),
    utc: Date()
  });
});

module.exports = router;



