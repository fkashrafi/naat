const Sales = require('../model/sales');

module.exports.getSales = async function (req, res) {
    try {
        const sales = await Sales.find();
        return res.status(200).json(sales);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports.postSales = async function (req, res) {
    try {
        const {
            c_name,
            c_number,
            date,
            invoice_num,
            book_list
        } = req.body;
        const sales = await Sales.create({
            c_name,
            c_number,
            date,
            invoice_num,
            book_list
        });
        return res.status(200).json(sales);
    } catch (error) {
        res.status(400).send(error.message);
    }

}