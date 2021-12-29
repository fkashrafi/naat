const Books = require('../model/books');

// get all
module.exports.getBooks = async function (req, res) {
    try {
        const quotes = await Books.find();
        console.log("GET QUOTES", quotes);
        return res.status(200).json(quotes);

        // if (user && (await bcrypt.compare(password, user.password))) {
        //     const token = jwt.sign(
        //         { user_id: user._id, email },
        //         process.env.TOKEN_KEY,
        //         {
        //             expiresIn: "2h",
        //         }
        //     );

        //     user.token = token;
        //     return res.status(200).json(user);
        // }
        // res.status(400).send("Invalid Credentials");
    } catch (error) {
        console.log("Error", error);
        res.status(400).send(error.message);
    }
}

//post add new
module.exports.postBooks = async function (req, res) {
    try {
        const {
            book_name,
            inStock,
            inStockArr,
            author,
            price
        } = req.body;

        const quotes = await Books.create({
            book_name,
            inStock,
            inStockArr,
            author,
            price
        });
        return res.status(200).json(quotes);

        // if (user && (await bcrypt.compare(password, user.password))) {
        //     const token = jwt.sign(
        //         { user_id: user._id, email },
        //         process.env.TOKEN_KEY,
        //         {
        //             expiresIn: "2h",
        //         }
        //     );

        //     user.token = token;
        //     return res.status(200).json(user);
        // }
        // res.status(400).send("Invalid Credentials");
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// get single by id
module.exports.getBook = async function (req, res) {
    try {
        const { id } = req.params;
        const quotes = await Books.findById(id);
        console.log("GET getBook", quotes);
        return res.status(200).json(quotes);

        if (findUserById) {
            res.send(findUserById);
        } else {
            res.send("sorry, data not found.");
        }
    } catch (error) {
        console.log("Error", error);
        res.status(400).send(error.message);
    }
}

//update one by id
module.exports.updateBook = async function (req, res) {
    try {
        const {
            _id,
            author,
            book_name,
            inStock,
            inStockArr,
            price,
        } = req.body;
        let filter = { _id };
        let update = {
            author, book_name, book_name, price, inStock, inStockArr,
        }

        const quotes = await Books.findOneAndUpdate(
            filter,
            update
        );
        return res.status(200).json(quotes);

        // if (findUserById) {
        //     res.send(findUserById);
        // } else {
        //     res.send("sorry, data not found.");
        // }
    } catch (error) {
        console.log("Error", error);
        res.status(400).send(error.message);
    }
}