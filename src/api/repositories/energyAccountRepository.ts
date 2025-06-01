import { MOCK_ENERGY_ACCOUNTS_API } from "./../../data/energyAccountsAPIMock";
import { EnergyAccount } from "./../../schemas/energyAccount.schema";

export class EnergyAccountRepository {
  private accounts: EnergyAccount[] = [];

  async init() {
    this.accounts = await MOCK_ENERGY_ACCOUNTS_API();
  }

  getAllAccounts() {
    return this.accounts;
  }

  getAccountById(id: string) {
    return this.accounts.find((acc) => acc.id === id);
  }
}
