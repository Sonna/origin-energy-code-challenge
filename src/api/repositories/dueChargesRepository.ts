import { MOCK_DUE_CHARGES_API } from "./../../data/dueChargesAPIMock";
import { DueCharge } from "./../../schemas/dueCharge.schema";

export class DueChargesRepository {
  private charges: DueCharge[] = [];

  async init() {
    this.charges = await MOCK_DUE_CHARGES_API();
  }

  getAllCharges() {
    return this.charges;
  }

  getChargesByAccountId(accountId: string) {
    return this.charges.filter((c) => c.accountId === accountId);
  }
}
