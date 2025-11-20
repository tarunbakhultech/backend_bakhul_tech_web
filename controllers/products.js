const getAllProducts = async (req, res) => {
    res.status(200).json({ msg: 'I am getting Product' });
};

const getAllProductstesting = async (req, res) => {
    res.status(200).json({ msg: 'I am getting Product testing' });
};

module.exports = { getAllProducts, getAllProductstesting };
