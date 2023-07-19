export enum TRANSACTION_TYPES {
  DEBITED = "debited",
  CREDITED = "credited",
}

export const COOKIE_KEY = "expense-tracker-app";

export const USER_DATA_LOCAL_STORAGE_KEY = "expense-tracker-app-user-data";

export const DEFAULT_CURRENY = "INR";

export const CURRENCY_OPTIONS = [
  { value: "INR", text: "INR" },
  { value: "USD", text: "USD" },
];

export const TRANSACTION_TYPE_OPTIONS = Object.values(TRANSACTION_TYPES).map(
  (type) => {
    return {
      value: type,
      text: type.charAt(0).toUpperCase() + type.slice(1),
    };
  }
);
