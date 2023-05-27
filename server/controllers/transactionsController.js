const show = async (req, res) => {
    const allData = await Transactions.findAll();
    res.json({ allData });
};
const showInfo = async (req, res) => {
    const id = req.params.id;
    const allData = await Transactions.findByPk(id);
    res.json({ allData });
};
const edit = async (req, res) => {
    const id = req.params.id;
    const allData = await Transactions.update(req.body, {
        where: {
            id: id,
        },
    });
    res.json({ allData });
};

module.exports = { show, showInfo, edit };
