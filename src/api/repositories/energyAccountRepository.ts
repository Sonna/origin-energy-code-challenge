import { MOCK_ENERGY_ACCOUNTS_API } from "./../../data/energyAccountsAPIMock";
import { EnergyAccount } from "./../../schemas/energyAccount.schema";

export class EnergyAccountRepository {
  private accounts: EnergyAccount[] = [];

  async init() {
    this.accounts = await MOCK_ENERGY_ACCOUNTS_API();
  }

  findAll(filter?: { type?: "GAS" | "ELECTRICITY" }) {
    if (!filter?.type) return this.accounts;
    return this.accounts.filter((acc) => acc.type === filter.type);
  }

  findById(id: string) {
    return this.accounts.find((acc) => acc.id === id) || null;
  }

  mustFindById(id: string) {
    const account = this.findById(id);
    if (account) return account;
    throw new Error(`Account ID ${id} not found`);
  }
}
