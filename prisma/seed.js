import { prisma } from "../src/db.js";
import bcryptjs from "bcryptjs";

async function main() {
  const roles = await prisma.role.createMany({
    data: [{ name: "Admin" }, { name: "Cliente" }, { name: "Repartidor" }],
  });
  console.log(roles);

  const salt = await bcryptjs.genSalt(10);
  const hashedPassword = await bcryptjs.hash("admin", salt);

  const newUser = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      phone: "456781",
    },
  });

  console.log(newUser);

  const assignedRole = await prisma.assignedRole.create({
    data: {
      role: {
        connect: { id: 1 },
      },
      user: {
        connect: { id: 1 },
      },
    },
  });

  console.log(assignedRole);

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

  const categories = await prisma.category.createMany({
    data: [
      { name: "Vestidos", description: "Vestidos elegantes y casuales" },
      { name: "Blusas", description: "Blusas de diversos estilos" },
      { name: "Camisas", description: "Camisas formales e informales" },
      { name: "Bufandas", description: "Bufandas para todas las temporadas" },
      { name: "Tacones", description: "Calzado de tacón alto" },
      { name: "Aros", description: "Aros y pendientes" },
      { name: "Collares", description: "Collares de diversos estilos" },
      { name: "Pantalones", description: "Pantalones casuales y formales" },
      { name: "Faldas", description: "Faldas de diferentes longitudes" },
      { name: "Zapatos planos", description: "Calzado cómodo y plano" },
      { name: "Carteras", description: "Carteras y bolsos de moda" },
      {
        name: "Cinturones",
        description: "Cinturones de diferentes materiales",
      },
      { name: "Sombreros", description: "Sombreros y gorras de temporada" },
    ],
  });

  console.log(categories);
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
