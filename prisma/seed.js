import { prisma } from "../src/db.js";
import bcryptjs from "bcryptjs";

async function main() {
  const existingRoles = await prisma.role.findMany({
    where: {
      name: {
        in: [process.env.ADMIN_ROLE, "Cliente", "Repartidor"],
      },
    },
  });

  if (existingRoles.length === 0) {
    const roles = await prisma.role.createMany({
      data: [
        {
          name: process.env.ADMIN_ROLE,
          description: "Superusuario encargado de administar las sucursales.",
        },
        {
          name: "Cliente",
          description:
            "Cliente de la tienda que puede hacer pedidos desde su carrito.",
        },
        {
          name: "Repartidor",
          description: "Repartidores oficiales de la tienda.",
        },
      ],
    });
    console.log("Roles insertados:", roles);
  } else {
    console.log("Los roles ya existen, se omite la inserción.");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: process.env.ADMIN_EMAIL },
  });

  if (!existingUser) {
    const newUser = await prisma.user.create({
      data: {
        name: "Admin",
        email: process.env.ADMIN_EMAIL,
        phone: "456781",
      },
    });
    console.log("Nuevo usuario creado:", newUser);

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(
      process.env.ADMIN_PASSWORD,
      salt
    );

    const assignedRole = await prisma.assignedRole.create({
      data: {
        password: hashedPassword,
        role: {
          connect: { id: 1 },
        },
        user: {
          connect: { id: newUser.id },
        },
      },
    });
    console.log("Rol asignado al nuevo usuario:", assignedRole);
  } else {
    console.log("El usuario Admin ya existe, se omite la creación.");
  }

  // 1. Verificar si el usuario "Delivery Man" ya existe
  const existingDeliveryUser = await prisma.user.findUnique({
    where: { email: "deliveryMan@gmail.com" },
  });

  if (!existingDeliveryUser) {
    // 2. Si no existe, crear el nuevo usuario "Delivery Man"
    const deliveryUser = await prisma.user.create({
      data: {
        name: "Delivery Man",
        email: "deliveryMan@gmail.com",
        phone: "456789",
      },
    });
    console.log("Nuevo usuario Delivery Man creado:", deliveryUser);

    // 3. Generar el hash de la contraseña
    const saltDM = await bcryptjs.genSalt(10);
    const hashedDM = await bcryptjs.hash("man Delivery", saltDM);

    // 4. Crear el rol asignado para "Delivery Man"
    const DmRole = await prisma.assignedRole.create({
      data: {
        password: hashedDM,
        role: {
          connect: { id: 3 }, // ID del rol de Repartidor
        },
        user: {
          connect: { id: deliveryUser.id }, // Conectar con el nuevo usuario creado
        },
      },
    });
    console.log("Rol asignado al nuevo usuario Delivery Man:", DmRole);
  } else {
    console.log("El usuario Delivery Man ya existe, se omite la creación.");
  }

  // 1. Verificar si las sucursales ya existen
  const existingBranches = await prisma.branch.findMany({
    where: {
      OR: [{ name: "Santos dumont" }, { name: "Chiquitos" }],
    },
  });

  if (existingBranches.length === 0) {
    // 2. Si ninguna de las sucursales existe, crear ambas
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

    console.log("Sucursales creadas:", branchs);
  } else {
    console.log("Las sucursales ya existen, se omite la creación.");
  }

  // 1. Verificar si las estaciones ya existen
  const existingSeasons = await prisma.season.findMany({
    where: {
      OR: [
        { name: "Invierno" },
        { name: "Primavera" },
        { name: "Verano" },
        { name: "Otoño" },
      ],
    },
  });

  if (existingSeasons.length === 0) {
    // 2. Si ninguna de las estaciones existe, crearlas todas
    const seasons = await prisma.season.createMany({
      data: [
        { name: "Invierno", description: "Productos de invierno" },
        { name: "Primavera", description: "Productos de primavera" },
        { name: "Verano", description: "Productos de verano" },
        { name: "Otoño", description: "Productos de otoño" },
      ],
    });

    console.log("Estaciones creadas:", seasons);
  } else {
    console.log("Las estaciones ya existen, se omite la creación.");
  }

  // 1. Verificar si las categorías de tipo ya existen
  const existingTypeCategories = await prisma.typeCategory.findMany({
    where: {
      OR: [
        { name: "Ropa" },
        { name: "Biyuteria y accesorios" },
        { name: "Zapatos" },
      ],
    },
  });

  if (existingTypeCategories.length === 0) {
    // 2. Si no existen, crearlas todas
    const typeCategory = await prisma.typeCategory.createMany({
      data: [
        { name: "Ropa", description: "Diversos tipos de ropa" },
        {
          name: "Biyuteria y accesorios",
          description: "Diversos tipos de biyuteria y accesorios",
        },
        { name: "Zapatos", description: "Diversos tipos de zapatos" },
      ],
    });

    console.log("Categorías de tipo creadas:", typeCategory);
  } else {
    console.log("Las categorías de tipo ya existen, se omite la creación.");
  }

  // 1. Verificar si las categorías ya existen
  const existingCategories = await prisma.category.findMany({
    where: {
      OR: [
        { name: "Vestidos" },
        { name: "Blusas" },
        { name: "Camisas" },
        { name: "Bufandas" },
        { name: "Tacones" },
        { name: "Aros" },
        { name: "Collares" },
        { name: "Pantalones" },
        { name: "Faldas" },
        { name: "Zapatos planos" },
        { name: "Carteras" },
        { name: "Cinturones" },
        { name: "Sombreros" },
      ],
    },
  });

  if (existingCategories.length === 0) {
    // 2. Si no existen, crearlas todas
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

    console.log("Categorías creadas:", categories);
  } else {
    console.log("Las categorías ya existen, se omite la creación.");
  }

  // 1. Verificar si las tallas ya existen
  const existingSizes = await prisma.size.findMany({
    where: {
      OR: [{ id: "S" }, { id: "M" }, { id: "L" }, { id: "XL" }, { id: "XXL" }],
    },
  });

  if (existingSizes.length === 0) {
    // 2. Si no existen, crearlas todas
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

    console.log("Tallas creadas:", sizes);
  } else {
    console.log("Las tallas ya existen, se omite la creación.");
  }

  // 1. Verificar si las marcas ya existen
  const existingBrands = await prisma.brand.findMany({
    where: {
      name: {
        in: [
          "Gucci",
          "Prada",
          "Zara",
          "H&M",
          "Louis Vuitton",
          "Nike",
          "Adidas",
          "Under Armour",
          "Levi's",
          "Calvin Klein",
        ],
      },
    },
  });

  if (existingBrands.length === 0) {
    // 2. Si no existen, crearlas todas
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

    console.log("Marcas creadas:", brands);
  } else {
    console.log("Las marcas ya existen, se omite la creación.");
  }

  // 1. Verificar si los tipos de orden ya existen
  const existingOrderTypes = await prisma.orderType.findMany({
    where: {
      name: {
        in: [
          "Entrega",
          "Reserva",
          "Recogida en tienda",
          "Entrega urgente",
          "Preorden",
          "Suscripción",
          "Click & Collect",
        ],
      },
    },
  });

  if (existingOrderTypes.length === 0) {
    // 2. Si no existen, crearlos todos
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

    console.log("Tipos de orden creados:", orderTypes);
  } else {
    console.log("Los tipos de orden ya existen, se omite la creación.");
  }

  // 1. Verificar si las divisas ya existen
  const existingCurrencies = await prisma.currency.findMany({
    where: {
      name: {
        in: ["Bolivianos", "Dólares", "Euros", "Libras Esterlinas"], // Añadido "Euros" y "Libras Esterlinas"
      },
    },
  });

  if (existingCurrencies.length === 0) {
    // 2. Si no existen, crearlas todas
    const currencies = await prisma.currency.createMany({
      data: [
        { name: "Bolivianos" },
        { name: "Dólares" },
        { name: "Euros" }, // Añadido
        { name: "Libras Esterlinas" }, // Añadido
      ],
    });

    console.log("Divisas creadas:", currencies);
  } else {
    console.log("Las divisas ya existen, se omite la creación.");
  }

  // 1. Verificar si los métodos de pago ya existen
  const existingPayments = await prisma.payment.findMany({
    where: {
      name: {
        in: [
          "Razorpay",
          "Stripe",
          "Efectivo",
          "PayPal", // Añadido
          "Transferencia Bancaria", // Añadido
        ],
      },
    },
  });

  if (existingPayments.length === 0) {
    // 2. Si no existen, crearlos todos
    const payments = await prisma.payment.createMany({
      data: [
        {
          name: "Razorpay",
          description: "Pago a través de la plataforma Razorpay",
        },
        {
          name: "Stripe",
          description: "Pago a través de la plataforma Stripe",
        },
        { name: "Efectivo", description: "Pago realizado en efectivo" },
      ],
    });

    console.log("Métodos de pago creados:", payments);
  } else {
    console.log("Los métodos de pago ya existen, se omite la creación.");
  }

  // 1. Verificar si los catálogos ya existen
  const existingCatalogs = await prisma.catalog.findMany({
    where: {
      name: {
        in: ["Catálogo de Invierno", "Catálogo de Primavera"], // Nombres de los catálogos
      },
    },
  });

  if (existingCatalogs.length === 0) {
    // 2. Si no existen, crearlos
    const catalogs = await prisma.catalog.createMany({
      data: [
        {
          name: "Catálogo de Invierno",
          seasonId: 1, // Asegúrate de que este ID exista en tu tabla de Season
        },
        {
          name: "Catálogo de Primavera",
          seasonId: 2, // Asegúrate de que este ID exista en tu tabla de Season
        },
      ],
    });

    console.log("Catálogos creados:", catalogs);
  } else {
    console.log("Los catálogos ya existen, se omite la creación.");
  }
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
