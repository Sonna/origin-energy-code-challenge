import { EnergyAccountRepository } from "./../repositories/energyAccountRepository";
import { DueChargesRepository } from "./../repositories/dueChargesRepository";

export class PaymentService {
  constructor(
    private energyRepo: InstanceType<typeof EnergyAccountRepository>,
    private chargesRepo: InstanceType<typeof DueChargesRepository>,
  ) {}

  makePayment(accountId: string, amount: number) {
    this.energyRepo.mustFindById(accountId);
    return this.chargesRepo.create(accountId, -amount);
  }
}
