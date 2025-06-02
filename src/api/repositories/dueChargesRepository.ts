import { v4 as uuidv4 } from "uuid";

import { MOCK_DUE_CHARGES_API } from "./../../data/dueChargesAPIMock";
import { DueCharge } from "./../../schemas/dueCharge.schema";

export class DueChargesRepository {
  private charges: DueCharge[] = [];

  async init() {
    this.charges = await MOCK_DUE_CHARGES_API();
  }

  findAll() {
    return this.charges;
  }

  findByAccountId(accountId: string) {
    return this.charges.filter((c) => c.accountId === accountId);
  }

  create(accountId: string, amount: number) {
    const dueCharge = {
      id: `D-${uuidv4()}`,
      accountId,
      date: new Date().toISOString().split("T")[0],
      amount,
    };
    this.charges.push(dueCharge);
    return dueCharge;
  }
}
