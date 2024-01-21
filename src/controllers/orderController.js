const { Order, Cart_item, Order_detail, Product } = require("../db/models");
const { Sequelize } = require("sequelize");
const ErrorHandler = require("../middlewares/errorHandler");

const createOrder = async (req, res) => {
    const { shipping_address, total_price, weight, cart_id } = req.body;
    const user = req.user;
    try {
        // Validasi dulu cart_id nya ada
        const result = await Sequelize.transaction(async (t) => {
            const order = await Order.create({
                customer_id: user.user_id,
                shipping_address,
                total_price,
                weight,
            });

            const cart_detail = await Cart_item.findAll({ where: { cart_id } });

            console.log(cart_detail);

            return order;
        });

        res.send({ result });

        // Buat order_id

        // Ambil data dari cart_id trus salin ke order_detail dengan id hasil dari order.

        // buat incoivenya

        // hapus data di cart_id
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

// READ / Customer bisa ngelihat order
const getAllOrders = async (req, res) => {
    const { user_role } = req.user;

    try {
        if (user_role !== "seller") {
            throw new ErrorHandler("Anda tidak dapat melakukan aksi ini", 403);
        }

        const orders = await Order.findAll();

        if (!orders) {
            throw new ErrorHandler("Belum ada order yang masuk", 404);
        }

        res.status(200).send({ orders });
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

const getOwnOrder = async (req, res) => {
    const {id} = req.user
}

const getSingleOrder = async (req, res) => {
    const { id } = req.params;
    const { user_role, user_id } = req.user;

    try {
        const order = await Order.findOne({
            where: { id },
            include: {
                model: Order_detail,
                include: {
                    model: Product,
                },
            },
        });

        if (user_role !== "seller") {
            if (order.customer_id !== user_id) {
                throw new ErrorHandler("Anda tidak dapat mengakses ini", 403);
            }
            throw new ErrorHandler("Anda tidak dapat mengakses ini", 403);
        }

        if (!order) {
            throw new ErrorHandler("Order tersebut tidak ada", 404);
        }

        res.status(200).send({ order });
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

const updateOrderStatus = async (req, res) => {
    const { user_role } = req.user;
    const { id } = req.params;
    const { updatedStatus } = req.body;

    try {
        if (user_role !== "seller") {
            throw new ErrorHandler("Anda tidak dapat melakukan aksi ini", 403);
        }

        // Tambah validation untuk id

        const order = await Order.findByPk(id);

        if (!order) {
            throw new ErrorHandler("Order tersebut tidak ditemukan", 403);
        }

        // Tambah validation updatedStatus

        await Order.update(
            { status_order: updatedStatus },
            {
                where: {
                    id,
                },
            }
        );

        res.status(200).send({
            message: `Berhasil memperbaharui status order menjadi ${updatedStatus}`,
        });
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};
//

module.exports = {
    createOrder,
    updateOrderStatus,
    getAllOrders,
    getSingleOrder,
};
