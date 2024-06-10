import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();

type User = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  phone: string;
};

type Job = {
  description: string;
  userId: number;
  address: string;
};

type Warrenty = {
  jobId: number;
  duration: number;
};

function getUsers(): Array<User> {
  return [
    {
      name: "uswinnerton0",
      email: "joag0@uiuc.edu",
      password: "lD0=.%JA*",
      isAdmin: false,
      phone: "239 730 8185",
    },
    {
      name: "fgladyer1",
      email: "akiossel1@youtu.be",
      password: "qB5?e6e~O",
      isAdmin: false,
      phone: "606 262 1281",
    },
    {
      name: "hthorn2",
      email: "cunitt2@slate.com",
      password: "eC9+6mvaQ=wO`{+@",
      isAdmin: false,
      phone: "266 165 3058",
    },
    {
      name: "wbrane3",
      email: "epickring3@hp.com",
      password: 'xX2=HSkCu$$"6B',
      isAdmin: false,
      phone: "336 396 3972",
    },
    {
      name: "Rene",
      email: "rene@gmail.com",
      password: "Rene1234!",
      isAdmin: true,
      phone: "123 456 7890",
    },
    {
      name: "David Kim",
      email: "dhskim22@gmail.com",
      password: "abc123!",
      isAdmin: true,
      phone: "139 730 8185",
    },
    {
      email: "bao4ltyfe@gmail.com",
      name: "bao",
      password: "123Abc",
      isAdmin: true,
      phone: "123-231-3344",
    },
  ];
}

function getJobs(): Array<Job> {
  return [
    {
      description: "Pests",
      userId: 1,
      address: "21 park place",
    },
    {
      description: "Termite",
      userId: 2,
      address: "21 park place",
    },
    {
      description: "Termite",
      userId: 3,
      address: "90 smith street",
    },
    {
      description: "Ants",
      userId: 4,
      address: "90 smith street",
    },
  ];
}

function getWarrenties(): Array<Warrenty> {
  return [
    { jobId: 1, duration: 3 },
    { jobId: 2, duration: 2 },
    { jobId: 3, duration: 3 },
    { jobId: 4, duration: 1 },
  ];
}

async function main() {
  await prisma.warrenty.deleteMany()
  await prisma.job.deleteMany()
  await prisma.user.deleteMany()

  const users = await prisma.user.createMany({
    data: getUsers(),
  });
  const jobs = await prisma.job.createMany({
    data: getJobs(),
  });
  const warrenties = await prisma.warrenty.createMany({
    data: getWarrenties(),
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
