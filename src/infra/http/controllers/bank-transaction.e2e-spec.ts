import request from "supertest";
import { makePrismaAccount } from "../../../../test/factories/prisma/make-prisma-account";
import { makePrismaNaturalPerson } from "../../../../test/factories/prisma/make-prisma-natural-person";
import { app } from "../app";
import { prisma } from "../../repositories/prisma/prisma-service";
import { JwtService } from "../../cryptography/json-web-token-service";
import { makePrismaShopkeeper } from "../../../../test/factories/prisma/make-prisma-shopkeeper";

describe("POST /natural-person/transaction [E2E]", () => {
  it("Should be able to make a transaction between natural-people", async () => {
    const transactionValue = 56.3;
    const [payerBalace, payeeBalance] = [155, 15];

    const [payerAccount, payeeAccount] = await Promise.all([
      makePrismaAccount({ balance: payerBalace }),
      makePrismaAccount({ balance: payeeBalance }),
    ]);

    const [payer, payee] = await Promise.all([
      makePrismaNaturalPerson({ accountId: payerAccount.id }),
      makePrismaNaturalPerson({ accountId: payeeAccount.id }),
    ]);

    const token = await JwtService.generate(payer.id.toString());

    const response = await request(app)
      .post("/natural-person/transaction")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        value: transactionValue,
        payerId: payer.id.toString(),
        payeeId: payee.id.toString(),
      });

    expect(response.status).toEqual(204);

    const [payerAccountOnRepository, payeeAccountOnRepository] =
      await Promise.all([
        prisma.account.findUnique({
          where: { id: payerAccount.id.toString() },
        }),
        prisma.account.findUnique({
          where: { id: payeeAccount.id.toString() },
        }),
      ]);

    expect(payerAccountOnRepository?.balance).toEqual(
      payerBalace - transactionValue
    );
    expect(payeeAccountOnRepository?.balance).toEqual(
      payeeBalance + transactionValue
    );
  });

  it("Should be able to make a transaction from natural-person to shopkeeper", async () => {
    const transactionValue = 48;
    const [payerBalace, payeeBalance] = [65, 75];

    const [payerAccount, payeeAccount] = await Promise.all([
      makePrismaAccount({ balance: payerBalace }),
      makePrismaAccount({ balance: payeeBalance }),
    ]);

    const [payer, payee] = await Promise.all([
      makePrismaNaturalPerson({ accountId: payerAccount.id }),
      makePrismaShopkeeper({ accountId: payeeAccount.id }),
    ]);

    const token = await JwtService.generate(payer.id.toString());

    const response = await request(app)
      .post("/natural-person/transaction")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        value: transactionValue,
        payerId: payer.id.toString(),
        payeeId: payee.id.toString(),
      });

    expect(response.status).toEqual(204);

    const [payerAccountOnRepository, payeeAccountOnRepository] =
      await Promise.all([
        prisma.account.findUnique({
          where: { id: payerAccount.id.toString() },
        }),
        prisma.account.findUnique({
          where: { id: payeeAccount.id.toString() },
        }),
      ]);

    expect(payerAccountOnRepository?.balance).toEqual(
      payerBalace - transactionValue
    );
    expect(payeeAccountOnRepository?.balance).toEqual(
      payeeBalance + transactionValue
    );
  });

  it("Should not be able to make a transaction from another user", async () => {
    const transactionValue = 48;
    const [payerBalace, payeeBalance] = [65, 75];

    const [payerAccount, payeeAccount] = await Promise.all([
      makePrismaAccount({ balance: payerBalace }),
      makePrismaAccount({ balance: payeeBalance }),
    ]);

    const [payer, payee] = await Promise.all([
      makePrismaNaturalPerson({ accountId: payerAccount.id }),
      makePrismaShopkeeper({ accountId: payeeAccount.id }),
    ]);

    const token = await JwtService.generate(payee.id.toString());

    const response = await request(app)
      .post("/natural-person/transaction")
      .set({ Authorization: `Bearer ${token}` })
      .send({
        value: transactionValue,
        payerId: payer.id.toString(),
        payeeId: payee.id.toString(),
      });

    expect(response.status).toEqual(401);

    const [payerAccountOnRepository, payeeAccountOnRepository] =
      await Promise.all([
        prisma.account.findUnique({
          where: { id: payerAccount.id.toString() },
        }),
        prisma.account.findUnique({
          where: { id: payeeAccount.id.toString() },
        }),
      ]);

    expect(payerAccountOnRepository?.balance).toEqual(payerBalace);
    expect(payeeAccountOnRepository?.balance).toEqual(payeeBalance);
  });
});
