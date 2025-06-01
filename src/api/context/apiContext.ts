import { EnergyAccountRepository } from "./../repositories/energyAccountRepository";
import { DueChargesRepository } from "./../repositories/dueChargesRepository";
import { EnergyAccountService } from "./../services/energyAccountService";

export type ApiContext = {
  energyAccountService: EnergyAccountService;
};

export async function createApiContext(): Promise<ApiContext> {
  const energyRepo = new EnergyAccountRepository();
  const chargesRepo = new DueChargesRepository();

  await Promise.all([energyRepo.init(), chargesRepo.init()]);

  const energyAccountService = new EnergyAccountService(
    energyRepo,
    chargesRepo,
  );

  return {
    energyAccountService,
  };
}
