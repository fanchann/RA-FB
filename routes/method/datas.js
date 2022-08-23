const e = require('express');
var data = require('../../db/data');
const gen = require('./gen')

const index = async (req, res) => {
    res.send(data)
}
const indexById = async (req, res) => {
    const {
        id
    } = req.params;

    const db = data.filter(db => db.id == id)[0];
    if (db !== undefined) {
        return res.json({
            status: true,
            data: {
                db
            }
        })
    } else {
        res.json({
            status: false,
            message: "Nothing data"
        })
    }
}

const post = async (req, res) => {
    let insertedAt = new Date().toISOString();
    let updatedAt = insertedAt;
    const valid = {
        id: gen.random(11111, 99999),
        nama: req.body.nama,
        umur: req.body.umur,
        insertedAt: insertedAt,
        updatedAt: updatedAt
    }


    if (valid.length == 0) {
        res.json({
            status: 400,
            message: "awokawok"
        })
    }
    await data.push(valid)
    res.json({
        status: true,
        message: 'OK',
        data: valid
    })
}


const editById = async (req, res) => {
    try {
        const {
            id
        } = req.params;
        let updateAt = new Date().toISOString();

        const find = data.findIndex(a => a.id == id);
        const checkName = req.body.nama
        if (checkName == undefined) {
            res.json({
                status: false,
                message: "Failed update name, please fill name"
            })
        } else if (find !== -1) {
            data[find] = {
                id: id,
                nama: checkName,
                umur: req.body.umur || data[0].umur
            }
            res.json({
                status: true,
                message: "Updated!",
                data: data[find]
            })
        }
    } catch (err) {
        res.json({
            status: false,
            message: err
        })
    }
}

const deleteById = (req, res) => {
    const {
        id
    } = req.params;
    const find = data.findIndex(a => a.id == id);

    if (find !== -1) {
        data.splice(find, 1);
        res.json({
            status: true,
            message: "Data delete succes"
        })
    } else {
        res.json({
            status: false,
            message: "Data not found"
        })
    }

}

module.exports = {
    index,
    indexById,
    post,
    editById,
    deleteById
};
``