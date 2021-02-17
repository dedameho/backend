const express = require('express');
const {
    clave
} = require('../../lib/config');
const pool = require('../../lib/pool');
const helpers = require('../../lib/helpers');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const router = express.Router();

router.post('/login', (req, res) => {
    var {
        email,
        password
    } = req.body;
    pool.query('SELECT password FROM users WHERE email = ?', [email], async (error, result, fields) => {
        if (error) {
            res.send(JSON.stringify({
                status: 'error',
                error: error
            })).status(500)
        } else {
            if (result[0]) {
                var storedPassword = result[0].password;
                var now = moment();
                var expiration = moment(now).add(24,'hours');
                if (await helpers.matchPassword(password, storedPassword)) {
                    const payload = {
                        check: true,
                        user: email
                    }
                    const token = jwt.sign(payload, clave, {
                        expiresIn: '24h'
                    })
                    res.status(200).json({
                        status: 'ok',
                        token: token,
                        expires_at: expiration
                    })
                } else {
                    res.json({
                        status: 'error',
                        mensaje: 'Usuario o contraseña incorrectos'
                    })
                }
            } else {
                res.json({
                    status: 'error',
                    mensaje: 'Usuario o contraseña incorrectos'
                })
            }
        }
    })
})
router.post('/signup', async (req, res) => {
    var {
        name,
        last_name,
        email,
        password
    } = req.body;
    var newUser = {
        name,
        last_name,
        email,
        password: await helpers.encryptPassword(password)
    }
    pool.query('INSERT INTO users SET ?', [newUser], (error, results, fields) => {
        if (error) {
            res.send(JSON.stringify({
                status: 'error',
                error: error
            })).status(500);
        } else {
            res.send(JSON.stringify({
                status: 'ok'
            }))
        }
    })
})

module.exports = router;