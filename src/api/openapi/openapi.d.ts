import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from 'openapi-client-axios';

declare namespace Components {
    namespace Schemas {
        export interface ElectricityAccount {
            id: string; // ^A-\d{4}$
            type: "ELECTRICITY";
            address: string;
            meterNumber: string; // ^\d{10}$
        }
        export type EnergyAccount = ElectricityAccount | GasAccount;
        export interface GasAccount {
            id: string; // ^A-\d{4}$
            type: "GAS";
            address: string;
            volume: number;
        }
    }
}
declare namespace Paths {
    namespace GetEnergyAccounts {
        namespace Parameters {
            export type AccountType = "GAS" | "ELECTRICITY";
        }
        export interface QueryParameters {
            accountType?: Parameters.AccountType;
        }
        namespace Responses {
            export type $200 = Components.Schemas.EnergyAccount[];
        }
    }
}


export interface OperationMethods {
  /**
   * getEnergyAccounts - Returns all energy accounts
   */
  'getEnergyAccounts'(
    parameters?: Parameters<Paths.GetEnergyAccounts.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig  
  ): OperationResponse<Paths.GetEnergyAccounts.Responses.$200>
}

export interface PathsDictionary {
  ['/energy-accounts']: {
    /**
     * getEnergyAccounts - Returns all energy accounts
     */
    'get'(
      parameters?: Parameters<Paths.GetEnergyAccounts.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig  
    ): OperationResponse<Paths.GetEnergyAccounts.Responses.$200>
  }
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>


export type ElectricityAccount = Components.Schemas.ElectricityAccount;
export type EnergyAccount = Components.Schemas.EnergyAccount;
export type GasAccount = Components.Schemas.GasAccount;
