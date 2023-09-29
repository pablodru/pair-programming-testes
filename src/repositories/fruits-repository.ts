import prisma from "../database/database.connection";
import { FruitInput } from "../services/fruits-service";

export type Fruit = {
  id: number,
  name: string,
  price: number
}

async function getFruits() :Promise<Fruit[]> {
  return await prisma.fruits.findMany();
}

async function getSpecificFruit(id: number) :Promise<Fruit> {
  return await prisma.fruits.findUnique({
    where: { id }
  })
}

async function getSpecificFruitByName(name: string): Promise<Fruit> {
  return await prisma.fruits.findFirst({
    where: { name }
  }) 
}

async function insertFruit(fruit: FruitInput) {
  return await prisma.fruits.create({
    data: {
      ...fruit
    }
  })
}

const fruitsRepository = {
  getFruits,
  getSpecificFruit,
  getSpecificFruitByName,
  insertFruit
}

export default fruitsRepository;