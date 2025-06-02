import { MOCK_DUE_CHARGES_API } from "./../../data/dueChargesAPIMock";
import { DueCharge } from "./../../schemas/dueCharge.schema";

export class DueChargesRepository {
  private lastId: string = "D-0016";
  private charges: DueCharge[] = [];

  async init() {
    this.charges = await MOCK_DUE_CHARGES_API();
    this.lastId = this.charges[this.charges.length - 1].id;
  }

  findAll() {
    return this.charges;
  }

  findByAccountId(accountId: string) {
    return this.charges.filter((c) => c.accountId === accountId);
  }

  create(accountId: string, amount: number) {
    const newId = this.generateNextId();
    const dueCharge = {
      id: newId,
      accountId,
      date: new Date().toISOString().split("T")[0], // e.g., "2025-05-31"
      amount,
    };
    this.charges.push(dueCharge);
    return dueCharge;
  }

  private generateNextId(): string {
    const match = this.lastId.match(/^D-(\d+)$/);
    const nextNumber = match ? parseInt(match[1], 10) + 1 : 1;
    this.lastId = `D-${String(nextNumber).padStart(4, "0")}`;
    return this.lastId;
  }
}
