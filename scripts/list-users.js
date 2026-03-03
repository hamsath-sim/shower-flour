const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const count = await prisma.user.count();
    const users = await prisma.user.findMany({
        select: { email: true, role: true, createdAt: true }
    });
    console.log(`Total users: ${count}`);
    users.forEach(u => console.log(`- ${u.email} (${u.role}) created at ${u.createdAt}`));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
