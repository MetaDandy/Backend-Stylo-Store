import { prisma } from "../db.js";
import { responses } from "../middlewares/responses.middleware.js";

// function for update a Order
const createOrder = async (req, res) => {
  try {
    const {
      orderTypeId,
      orderDescription,
      direction,
      paymentId,
      cartItems,
      total,
    } = req.body;

    console.log(cartItems);

    if (!orderTypeId) return responses.res400(res, "Tipo de pedido");
    if (!orderDescription)
      return responses.res400(res, "Descripcion del pedido");
    if (!direction) return responses.res400(res, "direction del pedido");
    if (!paymentId) return responses.res400(res, "Tipo de pago del pedido");
    if (cartItems.length === 0)
      return responses.res400(res, "No hay cosas que comprar");

    const userEmail = req.email;
    const user = await prisma.user.findFirst({
      where: { email: userEmail },
    });

    if (!user) return responses.res404(res, "user");

    const order = await prisma.order.create({
      data: {
        amount: Number(total),
        currencyId: 1,
        userId: user.id,
        paymentId: Number(paymentId),
      },
    });

    const orderStatus = await prisma.orderStatus.create({
      data: {
        description: orderDescription,
        orderId: order.id,
        orderTypeId: Number(orderTypeId),
      },
    });

    //Revisar que cada producto que se intente agregar exista
    // Verificar y agregar productos del carrito
    const cartData = cartItems.map((item) => ({
      quantity: Number(item.quantity),
      size: item.size,
      productId: Number(item.id), // El id del producto
      orderId: order.id, // ID de la orden creada
    }));

    // Insertar productos en la tabla Cart
    await prisma.cart.createMany({
      data: cartData,
    });

    const dm = await prisma.user.findFirst({
      where: { email: "deliveryMan@gmail.com" },
    });

    await prisma.delivery.create({
      data: {
        direction: direction,
        cost: 10,
        userId: dm.id,
        orderId: order.id,
      },
    });

    return responses.res201(res, `Pedido ${order.id}`, order);
  } catch (error) {
    return responses.res500(res, error);
  }
};

//function for view orders of 1 user
const userOrder = async (req, res) => {
  try {
    const email = req.email;

    const user = await prisma.user.findFirst({
      where: {
        deletedAt: null,
        email: email,
      },
    });

    if (!user) return responses.res404(res, "User");

    const orders = await prisma.order.findMany({
      where: {
        deletedAt: null,
        userId: user.id,
      },
      include: {
        orderStatus: {
          select: {
            description: true,
            orderType: {
              select: {
                name: true,
              },
            },
          },
        },
        delivery: {
          select: {
            direction: true,
          },
        },
        cart: {
          select: {
            size: true,
            quantity: true,
            product: {
              // El select aquí ya incluye la relación
              select: {
                name: true,
                price: true,
                photo: {
                  // No puedes usar `include` aquí, entonces usamos `select`
                  select: { path: true },
                },
              },
            },
          },
        },
      },
    });

    if (!orders) return responses.res404(res, "orders");

    return responses.res200(res, `Order for ${user.name}`, orders);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for update a Order
const updateOrder = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for delete a Order
const deleteOrder = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

// function for view all Orders
const viewOrder = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        orderStatus: {
          select: {
            description: true,
            orderType: {
              select: {
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            name: true,
            id: true,
          },
        },
        delivery: {
          select: {
            direction: true,
          },
        },
        cart: {
          select: {
            size: true,
            quantity: true,
            product: {
              // El select aquí ya incluye la relación
              select: {
                name: true,
                price: true,
                photo: {
                  // No puedes usar `include` aquí, entonces usamos `select`
                  select: { path: true },
                },
              },
            },
          },
        },
      },
    });

    if (!orders) return responses.res404(res, "orders");

    return responses.res200(res, `all orders`, orders);
  } catch (error) {
    return responses.res500(res, error);
  }
};

// function for view one Order
const viewOneOrder = async (req, res) => {
  return res.status(500).json({
    success: false,
    msg: "Function not implemented",
  });
};

export const OrderController = {
  createOrder,
  updateOrder,
  deleteOrder,
  viewOneOrder,
  viewOrder,
  userOrder,
};
