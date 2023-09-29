import { conflictError } from "../errors/conflict-error";
import { notFoundError } from "../errors/notfound-error";
import fruitsRepository, { Fruit } from "../repositories/fruits-repository";

export type FruitInput = Omit<Fruit, "id">;

async function getFruits() {
  return await fruitsRepository.getFruits();
}

async function getSpecificFruit(id: number) {
  const fruit = await fruitsRepository.getSpecificFruit(id);
  if (!fruit) {
    throw notFoundError();
  }

  return fruit;
}

async function createFruit(fruit: FruitInput): Promise<void> {
  const fruitAlreadyRegistered = await fruitsRepository.getSpecificFruitByName(fruit.name);
  console.log(fruitAlreadyRegistered)
  if (fruitAlreadyRegistered) {
    console.log('conflito');
    throw conflictError();
  }

  await fruitsRepository.insertFruit(fruit);
}

const fruitsService = {
  getFruits,
  getSpecificFruit,
  createFruit
}

export default fruitsService;