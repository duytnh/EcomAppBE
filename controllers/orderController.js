const Order = require('../models/Order');

module.exports = {
    getUserOrders: async (req, res) => {
        const userId = req.params.id;
        try {
            const userOrders = await Order.find({ userId })
                .populate({
                    path: 'productId',
                    select: "-description -product_loaction"
                }).exec();
            res.status(200).json(userOrders);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    loginUser: async (req, res) => {

    },
}