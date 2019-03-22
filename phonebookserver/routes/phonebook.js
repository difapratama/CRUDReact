var express = require('express');
var router = express.Router();
var Data = require('../models/phonebook');

// ADD DATA
router.post('/', (req, res, next) => {
    Data.create({

        id: Number(req.body.id),
        name: req.body.name,
        phone: req.body.phone
    },
        function (err, result) {
            if (err)
                res.json(err)
            else
                res.json({
                    status: "SUCCESS",
                    data: {
                        id: result.id,
                        name: result.name,
                        phone: result.phone
                    }
                })
        })
})

// GET ALL DATA
router.get('/', (req, res) => {
    Data.find().then(data => {
        res.status(201).send(data);
    }).catch(err => {
        res.send.handleError(err)
    })
});

// =================== edit =================== //

router.put('/:id', (req, res) => {
    let id = req.params.id;
    Data.findOneAndUpdate({ id: id }, {
        name: req.body.name,
        phone: req.body.phone
    }, { new: true }).then(item => {
        if (item) {
            res.json({
                status: "SUCCESS",
                data: item
            })
        } else {
            res.json({
                error: true,
                message: `updating data has been failed id : ${id} not found`
            })
        }
    }).catch(err => {
        res.json({
            error: true,
            message: err.message
        })
    })
})

// =================== delete =================== //
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    Data.findOneAndDelete({ id: id }).then(item => {
        if (item) {
            res.json({
                status: "SUCCESS",
                data: item
            })
        } else {
            res.json({
                error: true,
                message: `deleting data has been failed id : ${id} not found`
            })
        }
    }).catch(err => {
        res.json({
            error: true,
            message: err.message
        })
    })
})


module.exports = router;