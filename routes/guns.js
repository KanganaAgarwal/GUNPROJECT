const express = require('express');
const router = express.Router();
const Gun = require('../models/Gun');

//  SHOW ALL GUNS 
router.get('/', async (req, res) => {
    try {
        const guns = await Gun.find();
        res.render('guns/index', { guns });
    } catch (e) {
        console.log(e);
        res.send("Error fetching guns");
    }
});

// NEW GUN FORM 
router.get('/new', (req, res) => {
    res.render('guns/new');
});

//  CREATE GUN
router.post('/', async (req, res) => {
    try {
        console.log("CREATE DATA:", req.body);

        const { gunName, price } = req.body;

        const newGun = new Gun({
            gunName,
            price,
            automatic: req.body.automatic === 'on'
        });

        await newGun.save();

        res.redirect('/guns');
    } catch (e) {
        console.log("CREATE ERROR:", e);
        res.send(e.message);
    }
});

//  SHOW ONE GUN 
router.get('/:id', async (req, res) => {
    try {
        const gun = await Gun.findById(req.params.id);
        if (!gun) return res.send("Gun not found");
        res.render('guns/show', { gun });
    } catch (e) {
        console.log(e);
        res.send("Error showing gun");
    }
});

// EDIT FORM 
router.get('/:id/edit', async (req, res) => {
    try {
        const gun = await Gun.findById(req.params.id);
        if (!gun) return res.send("Gun not found");
        res.render('guns/edit', { gun });
    } catch (e) {
        console.log(e);
        res.send("Error loading edit page");
    }
});

//  UPDATE GUN 
router.post('/:id', async (req, res) => {
    try {
        console.log("UPDATE DATA:", req.body);

        const { gunName, price } = req.body;

        await Gun.findByIdAndUpdate(req.params.id, {
            gunName,
            price,
            automatic: req.body.automatic === 'on'
        });

        res.redirect(`/guns/${req.params.id}`);
    } catch (e) {
        console.log("UPDATE ERROR:", e);
        res.send(e.message);
    }
});

//  DELETE GUN 
router.post('/:id/delete', async (req, res) => {
    try {
        await Gun.findByIdAndDelete(req.params.id);
        res.redirect('/guns');
    } catch (e) {
        console.log("DELETE ERROR:", e);
        res.send("Error deleting gun");
    }
});

module.exports = router;