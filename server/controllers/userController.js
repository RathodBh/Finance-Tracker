const models = require("../models");
const User = models.users;
const { sequelize } = require("../models");

const show = async (req, res) => {
    const allData = await User.findAll();
    res.json({ allData });
};

const showAll = async (req, res) => {
    const allData = await User.findAll({
        include: [
            {
                model: models.transactions,
            },
        ],
    });
    res.json({ allData });
};

const showUser = async (req, res) => {
    const id = req.params.id;
    const allData = await User.findByPk(id);
    res.json({ allData });
};

const addUser = async (req, res) => {
    const data = req.body;
    
    // if (Array.isArray(data)) {
    //     const allData = await User.bulkCreate(data);
    //     res.json({ allData });
    // } else {
        const allData = await User.create(data);
        res.json({ data:allData });
    // }
};

const addAll = async (req, res) => {
    const data = req.body;
    // if (Array.isArray(data)) {
    const allData = await User.create(data, {
        include: [
            {
                model: models.transactions,
            },
        ],
    });
    res.json({ data:allData });
};

const patchUser = async (req, res) => {
    const id = req.params.id;
    const updatedData = User.update(req.body, {
        where: {
            id: id,
        },
    });
    res.json({ updatedData });
};

const patchAll = async (req, res) => {
    const id = req.params.id;

    try {
        await sequelize.transaction(async (transaction) => {
            const updatedData = User.update(
                req.body,
                {
                    where: {
                        id: id,
                    },
                },
                { transaction }
            );
            const updatedData2 = models.transactions.update(
                req.body.transactions,
                {
                    where: {
                        user_id: id,
                    },
                },
                { transaction }
            );
            res.json({ updatedData, updatedData2 });
        });
    } catch (err) {
        // res.json({ updatedData: "ERROR" + err });
        console.log(err);
    }
};

module.exports = {
    show,
    showUser,
    addUser,
    patchUser,
    showAll,
    addAll,
    patchAll,
};
