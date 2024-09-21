import { prisma } from "../src/db";

async function main() {
  const adminRole = await prisma.role.create({
    data: {
      name: "Admin",
    },
  });

  console.log(adminRole);

  const newUser = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@gmail.com",
      password: "sd",
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
