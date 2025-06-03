import { EnergyAccountRepository } from "./../repositories/energyAccountRepository";
import { DueChargesRepository } from "./../repositories/dueChargesRepository";
import { EnergyAccountService } from "./../services/energyAccountService";
import { PaymentService } from "./../services/paymentService";

export interface ApiServices {
  energyAccountService: EnergyAccountService;
  paymentService: PaymentService;
}

export interface ApiRepositories {
  energyRepo: EnergyAccountRepository;
  chargesRepo: DueChargesRepository;
}

export type ApiContext = {
  services: ApiServices;
  repos: ApiRepositories;
};

export async function createApiContext(): Promise<ApiContext> {
  const energyRepo = new EnergyAccountRepository();
  const chargesRepo = new DueChargesRepository();

  await Promise.all([energyRepo.init(), chargesRepo.init()]);

  const repos = [energyRepo, chargesRepo] as const;
  const energyAccountService = new EnergyAccountService(...repos);
  const paymentService = new PaymentService(...repos);

  return {
    services: { energyAccountService, paymentService },
    repos: { energyRepo, chargesRepo },
  };
}
