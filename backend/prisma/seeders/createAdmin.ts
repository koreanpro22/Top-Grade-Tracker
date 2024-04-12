import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function seedRene() {
    const admin = await prisma.user.create({
        data: {
            name: "Rene",
            email: "rene@gmail.com",
            password: "rene123",
            role: "BOSS",
            phone: "123-456-7890",
        }
    })
}

seedRene()
    .catch(e => {
        console.error(e.message)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })