import request from "supertest";
import { app } from "../app";
import { prisma } from "../../repositories/prisma/prisma-service";

describe("POST /shopkeeper [E2E]", () => {
  it("Should be able to create a shopkeeper", async () => {
    const data = {
      shopName: "My Shop",
      cnpj: "02122365411522",
      email: "myshop@example.com",
      password: "123456",
    };

    const response = await request(app).post("/shopkeeper").send(data);
    expect(response.status).toEqual(201);

    const shopkeeperOnDatabase = await prisma.user.findUnique({
      where: { document: data.cnpj },
    });
    expect(shopkeeperOnDatabase).toEqual(
      expect.objectContaining({
        name: data.shopName,
        document: data.cnpj,
        email: data.email,
      })
    );
  });
});
