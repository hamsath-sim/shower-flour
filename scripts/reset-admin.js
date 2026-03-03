const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
    const password = 'admin123';
    // We can use plain text if we want because auth.ts supports it, 
    // but better to hash it to be consistent.
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
        where: { email: 'admin@showerflour.com' },
        data: { password: hashedPassword }
    });

    console.log('Admin password updated successfully.');
    console.log('Email: admin@showerflour.com');
    console.log('New Password: admin123');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
