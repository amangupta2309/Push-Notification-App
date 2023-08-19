const { db } = require("../utils/admin");

exports.users = async (req, res) => {
    db.ref('USERS').once('value')
.then(function(snapshot) {
    // console.log( snapshot.val() )
    return res.status(201).json(snapshot.val());
})
};