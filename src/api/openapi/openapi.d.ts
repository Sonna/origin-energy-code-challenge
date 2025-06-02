import type {
  OpenAPIClient,
  Parameters,
  UnknownParamsObject,
  OperationResponse,
  AxiosRequestConfig,
} from "openapi-client-axios";

declare namespace Components {
  namespace Schemas {
    export type AccountType = "GAS" | "ELECTRICITY";
    export interface CreditCard {
      cardNumber: string;
      expiryDate: string; // ^(0[1-9]|1[0-2])\/\d{2}$
      cvv: string; // ^\d{3,4}$
    }
    export interface DueCharge {
      id: string; // ^D-\d{4}$
      accountId: string; // ^A-\d{4}$
      date: string;
      amount: number;
    }
    export interface ElectricityAccount {
      id: string; // ^A-\d{4}$
      type: "ELECTRICITY";
      address: string;
      meterNumber: string; // ^\d{10}$
    }
    export type EnergyAccountWithCharges =
      | {
          id: string; // ^A-\d{4}$
          type: "ELECTRICITY";
          address: string;
          meterNumber: string; // ^\d{10}$
          dueCharges: DueCharge[];
          totalDue: number;
        }
      | {
          id: string; // ^A-\d{4}$
          type: "GAS";
          address: string;
          volume: number;
          dueCharges: DueCharge[];
          totalDue: number;
        };
    export type EnergyAccountsResponse = EnergyAccountWithCharges[];
    export interface GasAccount {
      id: string; // ^A-\d{4}$
      type: "GAS";
      address: string;
      volume: number;
    }
    export interface MakePaymentInput {
      accountId: string;
      creditCard: CreditCard;
      amount: number;
    }
    export type MakePaymentResponse = DueCharge;
  }
}
declare namespace Paths {
  namespace GetEnergyAccounts {
    namespace Parameters {
      export type AccountType = Components.Schemas.AccountType;
      export type Q = string;
    }
    export interface QueryParameters {
      accountType?: Parameters.AccountType;
      q?: Parameters.Q;
    }
    namespace Responses {
      export type $200 = Components.Schemas.EnergyAccountsResponse;
    }
  }
  namespace MakePayment {
    export type RequestBody = Components.Schemas.MakePaymentInput;
    namespace Responses {
      export type $200 = Components.Schemas.MakePaymentResponse;
      export interface $400 {}
    }
  }
}

export interface OperationMethods {
  /**
   * getEnergyAccounts - Returns all energy accounts
   */
  "getEnergyAccounts"(
    parameters?: Parameters<Paths.GetEnergyAccounts.QueryParameters> | null,
    data?: any,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.GetEnergyAccounts.Responses.$200>;
  /**
   * makePayment - Make a payment and apply it to an account
   */
  "makePayment"(
    parameters?: Parameters<UnknownParamsObject> | null,
    data?: Paths.MakePayment.RequestBody,
    config?: AxiosRequestConfig,
  ): OperationResponse<Paths.MakePayment.Responses.$200>;
}

export interface PathsDictionary {
  ["/energy-accounts"]: {
    /**
     * getEnergyAccounts - Returns all energy accounts
     */
    "get"(
      parameters?: Parameters<Paths.GetEnergyAccounts.QueryParameters> | null,
      data?: any,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.GetEnergyAccounts.Responses.$200>;
  };
  ["/make-payment"]: {
    /**
     * makePayment - Make a payment and apply it to an account
     */
    "post"(
      parameters?: Parameters<UnknownParamsObject> | null,
      data?: Paths.MakePayment.RequestBody,
      config?: AxiosRequestConfig,
    ): OperationResponse<Paths.MakePayment.Responses.$200>;
  };
}

export type Client = OpenAPIClient<OperationMethods, PathsDictionary>;

export type AccountType = Components.Schemas.AccountType;
export type CreditCard = Components.Schemas.CreditCard;
export type DueCharge = Components.Schemas.DueCharge;
export type ElectricityAccount = Components.Schemas.ElectricityAccount;
export type EnergyAccountWithCharges =
  Components.Schemas.EnergyAccountWithCharges;
export type EnergyAccountsResponse = Components.Schemas.EnergyAccountsResponse;
export type GasAccount = Components.Schemas.GasAccount;
export type MakePaymentInput = Components.Schemas.MakePaymentInput;
export type MakePaymentResponse = Components.Schemas.MakePaymentResponse;
