const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const user = await prisma.user.findUnique({
        where: { email: 'admin@showerflour.com' }
    });
    console.log('User found:', !!user);
    if (user) {
        console.log('Role:', user.role);
        console.log('Password set:', !!user.password);
        if (user.password) {
            console.log('Password length:', user.password.length);
            console.log('Is hashed (starts with $2):', user.password.startsWith('$2'));
            // DANGEROUS but useful for debugging if it's plain text
            if (!user.password.startsWith('$2')) {
                console.log('Actual password (PLAIN TEXT):', user.password);
            }
        }
    }

}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
