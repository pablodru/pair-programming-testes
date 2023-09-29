import app from "app";
import prisma from "database/database.connection";
import { FruitInput } from "services/fruits-service";
import supertest from "supertest";
import { buildFruit } from "./factories/fruits-factory";

const api = supertest(app);

beforeAll(async ()=> {
    await prisma.fruits.deleteMany();
})

beforeEach(async ()=> {
    await prisma.fruits.deleteMany();
})

describe("Post /fruits", ()=> {
    it("should return 201 when inserting a fruit", async ()=> {
        const fruit:FruitInput = {
            name: "uva",
            price: 1000
        }
        const result = await api.post('/fruits').send(fruit);
        expect(result.status).toBe(201);
    })
    it("should return 409 when inserting a fruit that is already registered", async () => {
        const fruit:FruitInput = {
            name: "uva",
            price: 1000
        }
        await api.post('/fruits').send(fruit);
        const { status } = await api.post('/fruits').send(fruit);
        expect(status).toBe(409);
    })
    it("should return 422 when inserting a fruit with data missing", async ()=> {
        const fruitMissingPrice:Omit<FruitInput, "price"> = {
            name: "uva"
        }
        const { status } = await api.post('/fruits').send(fruitMissingPrice)
        expect(status).toBe(422)
        const fruitMissingName:Omit<FruitInput, "name"> = {
            price: 1000
        }
        const { statusCode } = await api.post('/fruits').send(fruitMissingName)
        expect(statusCode).toBe(422)
    })
})

describe("GET /fruits", () => {
    it("shoud return 404 when trying to get a fruit by an id that doesn't exist", async ()=> {
        const fruit = await buildFruit();
        const { status } = await api.get(`/fruits/${fruit.id+10}`);
        expect(status).toBe(404)
    })
    it("should return 400 when id param is present but not valid", async()=> {
        const { status } = await api.get('/fruits/dois');
        expect(status).toBe(400);
    })
    it("should return one fruit when given a valid and existing id", async()=>{
        const fruit = await buildFruit();
        const { status, body } = await api.get(`/fruits/${fruit.id}`);
        expect(status).toBe(200);
        expect(body).toEqual(fruit)
    })
    it("should return all fruits if no id is present", async ()=> {
        const fruit = await buildFruit();
        const { status, body } = await api.get(`/fruits`);
        expect(status).toBe(200);
        expect(body).toHaveLength(1)
    })
})