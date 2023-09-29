import prisma from "database/database.connection";
import { Fruit } from "repositories/fruits-repository";

export async function buildFruit() {
    const fruit :Omit<Fruit, "id"> = {
        name: "uva",
        price: 1000
    }
    const fruitCreated = await prisma.fruits.create({
        data: {
            ...fruit
        }
    })
    return fruitCreated; 
}