import request from "supertest";
import { app } from "../app";
import { prisma } from "../../repositories/prisma/prisma-service";

describe("POST /natural-person [E2E]", () => {
  it("Should be able to create a natural person", async () => {
    const data = {
      fullName: "John Doe",
      cpf: "00435647842",
      email: "johndoe@example.com",
      password: "123456",
    };

    const response = await request(app).post("/natural-person").send(data);
    expect(response.status).toEqual(201);

    const naturalPersonOnDatabase = await prisma.user.findUnique({
      where: { document: data.cpf },
    });
    expect(naturalPersonOnDatabase).toEqual(
      expect.objectContaining({
        name: data.fullName,
        document: data.cpf,
        email: data.email,
      })
    );
  });
});
