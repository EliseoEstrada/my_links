const express = require('express');
const router = express.Router();
const db = require('../database');
const {isLogged} = require('../lib/helpers');

router.get('/add', isLogged, (req, res) => {
    res.render('links/add');
})

router.post('/add', isLogged, async (req, res) => {
    const { title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };

    await db.query('INSERT INTO links SET ?', [newLink]);
    req.flash('success', 'Link successfully saved');
    res.redirect('/links');
})

router.get('/', isLogged, async (req, res) => {
    const links = await db.query('SELECT * FROM links WHERE user_id = ?', req.user.id);
    res.render('links/list', {links: links});
});

router.get('/delete/:id', isLogged, async (req, res) => {
    const {id} = req.params;
    await db.query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Link deleted successfully');
    res.redirect('/links');
})

router.get('/edit/:id', isLogged, async (req, res) => {
    const {id} = req.params;
    const link = await db.query('SELECT * FROM links WHERE id = ?', [id]);
    res.render('links/edit', {link: link[0]});
})

router.post('/edit/:id', isLogged, async (req, res) => {
    const {id} = req.params;
    const { title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description
    };

    await db.query('UPDATE links SET ? WHERE id = ?', [newLink, id]);
    req.flash('success', 'Link edited successfully');
    res.redirect('/links');
})

module.exports = router;