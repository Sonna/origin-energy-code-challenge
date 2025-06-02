import { MOCK_ENERGY_ACCOUNTS_API } from "./../../data/energyAccountsAPIMock";
import { EnergyAccount } from "./../../schemas/energyAccount.schema";

export class EnergyAccountRepository {
  private accounts: EnergyAccount[] = [];

  async init() {
    this.accounts = await MOCK_ENERGY_ACCOUNTS_API();
  }

  findAll(filter?: { type?: "GAS" | "ELECTRICITY"; address?: string }) {
    return this.accounts.filter((acc) => {
      const matchesType = !filter?.type || acc.type === filter?.type;
      const matchesSearch =
        !filter?.address ||
        filter?.address
          .toLowerCase()
          .split(/\s+/)
          .every((word) => acc.address.toLowerCase().includes(word));
      return matchesType && matchesSearch;
    });
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
