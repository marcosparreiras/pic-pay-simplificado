import request from "supertest";
import { makePrismaNaturalPerson } from "../../../../test/factories/prisma/make-prisma-natural-person";
import { BcryptService } from "../../cryptography/bcrypt-service";
import { app } from "../app";
import { makePrismaAccount } from "../../../../test/factories/prisma/make-prisma-account";
import { makePrismaShopkeeper } from "../../../../test/factories/prisma/make-prisma-shopkeeper";

describe("POST /session [E2E]", () => {
  const bcryptService = new BcryptService();
  it("Should be able to authenticate a natural-person", async () => {
    const password = "54@45ga12";
    const hashPassowrd = await bcryptService.hash(password);

    const account = await makePrismaAccount();
    const naturalPerson = await makePrismaNaturalPerson({
      password: hashPassowrd,
      accountId: account.id,
    });

    const response = await request(app).post("/session").send({
      password,
      email: naturalPerson.email,
    });

    expect(response.status).toEqual(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });

  it("Should be able to authenticate a shopkeeper", async () => {
    const password = "54@45ga12";
    const hashPassowrd = await bcryptService.hash(password);

    const account = await makePrismaAccount();
    const shopkeeper = await makePrismaShopkeeper({
      password: hashPassowrd,
      accountId: account.id,
    });

    const response = await request(app).post("/session").send({
      password,
      email: shopkeeper.email,
    });

    expect(response.status).toEqual(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });
});
