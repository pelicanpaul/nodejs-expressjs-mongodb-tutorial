
var express = require('express');
var router = express.Router();

/*
 * GET userlist.
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    db.collection('userlist').find().toArray(function (err, items) {
        res.json(items);
    });
});


/*
 * POST to adduser.
 */
router.post('/adduser', function(req, res) {
    var db = req.db;
    db.collection('userlist').insert(req.body, function(err, result){
        res.send(
            (err === null) ? { msg: '' } : { msg: err }
        );
    });
});

/*
 * PUT to updateuser.
 */
router.put('/updateuser/:id', function(req, res) {
    var db = req.db;
    var userToUpdate = req.params.id.toString();

    var theAge = req.body.age;
    var theUsername = req.body.username;
    var theFullname = req.body.fullname;
    var theLocation = req.body.location;
    var theColor = req.body.color;
    var theGender = req.body.gender;
    var theEmail = req.body.email;

    db.collection('userlist').updateById(userToUpdate,
        {$set:{
            age: theAge,
            username: theUsername,
            fullname: theFullname,
            location: theLocation,
            gender: theGender,
            color: theColor,
            email: theEmail
        }},
        {multi:false}, function(err, result){
            res.send(
                (err === null) ? { msg: '' } : { msg: err }
            );
    });

});

/*
 * DELETE to deleteuser.
 */
router.delete('/deleteuser/:id', function(req, res) {
    var db = req.db;
    var userToDelete = req.params.id;
    db.collection('userlist').removeById(userToDelete, function(err, result) {
        res.send((result === 1) ? { msg: '' } : { msg:'error: ' + err });
    });
});



module.exports = router;