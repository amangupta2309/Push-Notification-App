const { db } = require("../utils/admin");

exports.Analytics = async (req, res) => {
    db.ref('Analytics').once('value')
.then(function(snapshot) {
    // console.log( snapshot.val() )
    return res.status(201).json(snapshot.val());
})
};