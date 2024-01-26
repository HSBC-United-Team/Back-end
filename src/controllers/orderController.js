const {
    Order,
    Cart_item,
    Cart,
    Order_detail,
    Product,
    Invoice,
    Payment,
    sequelize,
} = require("../db/models");
const ErrorHandler = require("../middlewares/errorHandler");
const {
    newOrderValidation,
    singleOrderValidation,
    updateOrderStatusValidation,
} = require("../validations/ordersValidations/order.validation");

const createOrder = async (req, res) => {
    const { shipping_address, total_price, weight, cart_id } = req.body;
    const { user_id } = req.user;

    const t = await sequelize.transaction();
    try {
        const validationResult = newOrderValidation(
            shipping_address,
            total_price,
            weight,
            cart_id
        );
        if (validationResult) {
            const cart = await Cart.findOne({
                where: { id: cart_id, customer_id: user_id },
            });

            console.log(cart);

            if (!cart) {
                throw new ErrorHandler(
                    "Anda tidak dapat membuat order ini",
                    403
                );
            }

            const order = await Order.create(
                {
                    customer_id: user_id,
                    shipping_address,
                    total_price,
                    weight,
                },
                { transaction: t }
            );

            const cart_items = await Cart_item.findAll({ where: { cart_id } });

            for (const cart_item of cart_items) {
                await Order_detail.create(
                    {
                        order_id: order.id,
                        product_id: cart_item.product_id,
                        subtotal_price: cart_item.subtotal_price,
                        quantity: cart_item.quantity,
                    },
                    { transaction: t }
                );
            }

            await Cart_item.destroy(
                { where: { id: cart_items.map((item) => item.id) } },
                { transaction: t }
            );

            // Create invoice
            const invoice = await Invoice.create(
                { order_id: order.id },
                { transaction: t }
            );

            await cart.destroy({ transaction: t });

            const isPaymentSuccessful = () => {
                const randNum = Math.floor(Math.random() * 10);

                if (randNum > 8) {
                    return false;
                } else {
                    return true;
                }
            };

            if (isPaymentSuccessful) {
                await Payment.create(
                    {
                        invoice_id: invoice.id,
                        customer_id: user_id,
                        amount: order.total_price,
                    },
                    { transaction: t }
                );

                await Invoice.update(
                    { isPaid: true },
                    { where: { id: invoice.id }, transaction: t }
                );

                await Order.update(
                    { order_status: "waiting for confirmation" },
                    {
                        where: {
                            id: order.id,
                        },
                        transaction: t,
                    }
                );
            } else {
                await order.update(
                    { order_status: "cancelled" },
                    {
                        where: {
                            id,
                        },
                    },
                    { transaction: t }
                );
            }

            await t.commit();

            res.status(200).send({ Message: "Berhasil membuat order" });
        }
    } catch (err) {
        console.log(err);
        await t.rollback();
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

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
    const { user_id } = req.user;

    try {
        const orders = await Order.findAll({
            where: { customer_id: Number(user_id) },
            include: {
                model: Order_detail,
                include: { model: Product },
            },
        });

        if (orders.length === 0) {
            throw new ErrorHandler("Anda belum punya order", 404);
        }

        res.status(200).send({ orders });
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

const getSingleOrder = async (req, res) => {
    const { order_id } = req.params;
    const { user_role, user_id } = req.user;

    const validationResult = singleOrderValidation(order_id);

    if (validationResult) {
        try {
            const order = await Order.findOne({
                where: { id: order_id },
                include: {
                    model: Order_detail,
                    include: {
                        model: Product,
                    },
                },
            });

            if (user_role !== "seller") {
                if (order.customer_id === Number(user_id)) {
                    if (!order) {
                        throw new ErrorHandler("Order tersebut tidak ada", 404);
                    }

                    res.status(200).send({ order });
                } else {
                    throw new ErrorHandler(
                        "Anda tidak dapat mengakses ini",
                        403
                    );
                }
            }

            res.status(200).send({ order });
        } catch (err) {
            const { status = 500, message } = err;
            res.status(status).send({ Error: message });
        }
    }
};

const updateOrderStatus = async (req, res) => {
    const { user_role } = req.user;
    const { id } = req.params;
    const { updatedStatus } = req.body;

    try {
        const validationResult = updateOrderStatusValidation(id, updatedStatus);

        if (validationResult) {
            if (user_role !== "seller") {
                throw new ErrorHandler(
                    "Anda tidak dapat melakukan aksi ini",
                    403
                );
            }

            const order = await Order.findByPk(id);

            if (!order) {
                throw new ErrorHandler("Order tersebut tidak ditemukan", 403);
            }

            await order.update(
                { order_status: updatedStatus },
                {
                    where: {
                        id,
                    },
                }
            );

            res.status(200).send({
                message: `Berhasil memperbaharui status order menjadi ${updatedStatus}`,
            });
        }
    } catch (err) {
        const { status = 500, message } = err;
        res.status(status).send({ Error: message });
    }
};

module.exports = {
    createOrder,
    updateOrderStatus,
    getAllOrders,
    getSingleOrder,
    getOwnOrder,
};
