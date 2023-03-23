import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'
const prisma = new PrismaClient()

async function main() {
  const alreadyHasUser = await prisma.user.findUnique({
    where: { email: 'user@cartio.com' },
  })

  if (alreadyHasUser) {
    return
  }

  const passwordHash = await hash('cartio', 8)

  await prisma.user.create({
    data: {
      name: 'User Cartio',
      email: 'user@cartio.com',
      password: passwordHash,
    },
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
