import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from "openapi-client-axios";

declare namespace Components {
  namespace Schemas {
    export interface ElectricityAccount {
      id: string; // ^A-\d{4}$
      type: "ELECTRICITY";
      address: string;
      meterNumber: string; // ^\d{10}$
    }
    export type EnergyAccount =
      | {
          id: string; // ^A-\d{4}$
          type: "ELECTRICITY";
          address: string;
          meterNumber: string; // ^\d{10}$
        }
      | {
          id: string; // ^A-\d{4}$
          type: "GAS";
          address: string;
          volume: number;
        };
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
    namespace Responses {
      export type $200 = (
        | {
            id: string; // ^A-\d{4}$
            type: "ELECTRICITY";
            address: string;
            meterNumber: string; // ^\d{10}$
          }
        | {
            id: string; // ^A-\d{4}$
            type: "GAS";
            address: string;
            volume: number;
          }
      )[];
    }
  }
}

export interface OperationMethods {
  /**
   * getEnergyAccounts - Returns all energy accounts
   */
  "getEnergyAccounts"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.GetEnergyAccounts.Responses.$200>;
}

export interface PathsDictionary {
  ["/energy-accounts"]: {
    /**
     * getEnergyAccounts - Returns all energy accounts
     */
    "get"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.GetEnergyAccounts.Responses.$200>;
  };
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>;

export type ElectricityAccount = Components.Schemas.ElectricityAccount;
export type EnergyAccount = Components.Schemas.EnergyAccount;
export type GasAccount = Components.Schemas.GasAccount;
