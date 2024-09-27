import { prisma } from "../src/db.js";
import bcryptjs from "bcryptjs";

async function main() {
  const roles = await prisma.role.createMany({
    data: [
      { name: process.env.ADMIN_ROLE },
      { name: "Cliente" },
      { name: "Repartidor" },
    ],
  });
  console.log(roles);

  const newUser = await prisma.user.create({
    data: {
      name: "Admin",
      email: process.env.ADMIN_EMAIL,
      phone: "456781",
    },
  });

  console.log(newUser);

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash(process.env.ADMIN_PASSWORD, salt);

  const assignedRole = await prisma.assignedRole.create({
    data: {
      password: hashedPassword,
      role: {
        connect: { id: 1 },
      },
      user: {
        connect: { id: 1 },
      },
    },
  });

  console.log(assignedRole);

  const deliveryUser = await prisma.user.create({
    data: {
      name: "Delivery Man",
      email: "deliveryMan@gmail.com",
      phone: "456789",
    },
  });

  console.log(deliveryUser);

  const saltDM = await bcryptjs.genSalt(10);
  const hashedDM = await bcryptjs.hash("man Delivery", saltDM);

  const DmRole = await prisma.assignedRole.create({
    data: {
      password: hashedDM,
      role: {
        connect: { id: 3 },
      },
      user: {
        connect: { id: 2 },
      },
    },
  });

  console.log(DmRole);

  const branchs = await prisma.branch.createMany({
    data: [
      {
        name: "Santos dumont",
        direction: "Santos Dumont 5to anillo barrio las misiones",
      },
      {
        name: "Chiquitos",
        direction: "Primer anillo entre charcas y chiquitos",
      },
    ],
  });

  console.log(branchs);

  const seasons = await prisma.season.createMany({
    data: [
      { name: "Invierno", description: "Productos de invierno" },
      { name: "Primavera", description: "Productos de primavera" },
      { name: "Verano", description: "Productos de verano" },
      { name: "Otoño", description: "Productos de otoño" },
    ],
  });

  console.log(seasons);

  const typeCategory = await prisma.typeCategory.createMany({
    data: [
      { name: "Ropa" },
      { name: "Biyuteria y accesorios" },
      { name: "Zapatos" },
    ],
  });

  console.log(typeCategory);

  const categories = await prisma.category.createMany({
    data: [
      {
        name: "Vestidos",
        description: "Vestidos elegantes y casuales",
        typeCategoryId: 1,
      },
      {
        name: "Blusas",
        description: "Blusas de diversos estilos",
        typeCategoryId: 1,
      },
      {
        name: "Camisas",
        description: "Camisas formales e informales",
        typeCategoryId: 1,
      },
      {
        name: "Bufandas",
        description: "Bufandas para todas las temporadas",
        typeCategoryId: 1,
      },
      {
        name: "Tacones",
        description: "Calzado de tacón alto",
        typeCategoryId: 3,
      },
      { name: "Aros", description: "Aros y pendientes", typeCategoryId: 2 },
      {
        name: "Collares",
        description: "Collares de diversos estilos",
        typeCategoryId: 2,
      },
      {
        name: "Pantalones",
        description: "Pantalones casuales y formales",
        typeCategoryId: 1,
      },
      {
        name: "Faldas",
        description: "Faldas de diferentes longitudes",
        typeCategoryId: 1,
      },
      {
        name: "Zapatos planos",
        description: "Calzado cómodo y plano",
        typeCategoryId: 3,
      },
      {
        name: "Carteras",
        description: "Carteras y bolsos de moda",
        typeCategoryId: 2,
      },
      {
        name: "Cinturones",
        description: "Cinturones de diferentes materiales",
        typeCategoryId: 2,
      },
      {
        name: "Sombreros",
        description: "Sombreros y gorras de temporada",
        typeCategoryId: 1,
      },
    ],
  });

  console.log(categories);

  const sizes = await prisma.size.createMany({
    data: [
      { id: "S", name: "Small", description: "Talla pequeña" },
      { id: "M", name: "Medium", description: "Talla mediana" },
      { id: "L", name: "Large", description: "Talla grande" },
      { id: "XL", name: "Extra Large", description: "Talla extra grande" },
      {
        id: "XXL",
        name: "Double Extra Large",
        description: "Talla doble extra grande",
      },
    ],
  });

  console.log(sizes);

  const brands = await prisma.brand.createMany({
    data: [
      { name: "Gucci" },
      { name: "Prada" },
      { name: "Zara" },
      { name: "H&M" },
      { name: "Louis Vuitton" },
      { name: "Nike" },
      { name: "Adidas" },
      { name: "Under Armour" },
      { name: "Levi's" },
      { name: "Calvin Klein" },
    ],
  });

  console.log(brands);

  const orderTypes = await prisma.orderType.createMany({
    data: [
      {
        name: "Entrega",
        description: "Pedido entregado en la dirección del cliente",
      },
      {
        name: "Reserva",
        description: "Pedido reservado para futura disponibilidad",
      },
      {
        name: "Recogida en tienda",
        description: "El cliente recoge el pedido en la tienda física",
      },
      {
        name: "Entrega urgente",
        description:
          "Pedido con procesamiento acelerado por un costo adicional",
      },
      {
        name: "Preorden",
        description: "Pedido de productos que aún no están disponibles",
      },
      {
        name: "Suscripción",
        description: "Pedido recurrente en un intervalo de tiempo",
      },
      {
        name: "Click & Collect",
        description: "Recogida en un punto específico fuera de la tienda",
      },
    ],
  });

  console.log(orderTypes);

  // Inserción de monedas (Currency)
  const currencies = await prisma.currency.createMany({
    data: [{ name: "Bolivianos" }, { name: "Dólares" }],
  });

  console.log(currencies);

  // Inserción de métodos de pago (Payment)
  const payments = await prisma.payment.createMany({
    data: [
      {
        name: "Razorpay",
        description: "Pago a través de la plataforma Razorpay",
      },
      { name: "Stripe", description: "Pago a través de la plataforma Stripe" },
      { name: "Efectivo", description: "Pago realizado en efectivo" },
    ],
  });

  console.log(payments);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
