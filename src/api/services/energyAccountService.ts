import { EnergyAccountRepository } from "./../repositories/energyAccountRepository";
import { DueChargesRepository } from "./../repositories/dueChargesRepository";

export class EnergyAccountService {
  constructor(
    private energyRepo: InstanceType<typeof EnergyAccountRepository>,
    private chargesRepo: InstanceType<typeof DueChargesRepository>,
  ) {}

  getAccountsWithCharges(filter?: {
    type?: "GAS" | "ELECTRICITY";
    address?: string;
  }) {
    const accounts = this.energyRepo.findAll(filter);
    const charges = this.chargesRepo.findAll();

    return accounts.map((account) => {
      const accountCharges = charges.filter((c) => c.accountId === account.id);
      const totalDue = accountCharges.reduce((sum, c) => sum + c.amount, 0);

      return {
        ...account,
        dueCharges: accountCharges,
        totalDue,
      };
    });
  }
}
