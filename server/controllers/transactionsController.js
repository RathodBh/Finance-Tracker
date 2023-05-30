const models = require("../models");
const Transactions = models.transactions;

const show = async (req, res) => {
    const allData = await Transactions.findAll();
    res.json({ data: allData });
};
const add = async (req, res) => {
    const data = req.body;
    const allData = await Transactions.create(data);
    res.json({ data: allData });
};
const showInfo = async (req, res) => {
    const id = req.params.id;
    const allData = await Transactions.findByPk(id);
    res.json({ data: allData });
};
const edit = async (req, res) => {
    const id = req.params.id;
    const allData = await Transactions.update(req.body, {
        where: {
            id: id,
        },
    });
    res.json({ data: allData });
};

module.exports = { show, showInfo, edit, add };
