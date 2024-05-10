import { LargeNumberLike } from "crypto";
import { db } from "../src/utils/db.server";
import { Prisma } from "@prisma/client";

type User = {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  phone: string;
};

type Client = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

type Job = {
  description: string;
  clientId: number;
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
  ];
}

function getJobs(): Array<Job> {
  return [
    {
      description: "Pests",
      clientId: 1,
      userId: 1,
      address: "21 park place",
    },
    {
      description: "Termite",
      clientId: 1,
      userId: 2,
      address: "21 park place",
    },
    {
      description: "Termite",
      clientId: 2,
      userId: 3,
      address: "90 smith street",
    },
    {
      description: "Ants",
      clientId: 2,
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
  await Promise.all(
    getUsers().map((user) => {
      const { name, email, password, isAdmin, phone } = user;
      db.user.create({
        data: {
          name,
          email,
          password,
          isAdmin,
          phone,
        },
      });
    })
  );
}

main();
