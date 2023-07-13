/* eslint-disable autofix/no-unused-vars */

/**
 * @enum MonetaryItem - Interface for a monetary item.
 *
 * @param {string} MONTHLY - The component displays a monthly outlook.
 * @param {string} YEARLY - The component displays a yearly outlook.
 */
export enum TimePeriod {
  WEEKLY = "weekly",
  MONTHLY = "monthly",
  YEARLY = "yearly",
}

/**
 * @enum MonetaryItemCategory - Enum for the type of a monetary item.
 *
 * @param {string} INCOME - The monetary item is an income.
 * @param {string} EXPENSE - The monetary item is an expense.
 * @param {string} SAVINGS - The monetary item is a savings.
 * @param {string} INVESTMENT - The monetary item is an investment.
 */
export enum MonetaryItemCategory {
  INCOME = "income",
  EXPENSE = "expense",
  SAVINGS = "savings",
  INVESTMENT = "investment",
}

/**
 * @enum MonetaryItem - Interface for a monetary item.
 *
 * @param {string} AUTH - The auth token.
 * @param {string} REFRESH - The refresh token.
 */
export enum tokenType {
  AUTH = "auth",
  REFRESH = "refresh",
}

/**
 * @interface TokenPayload - Interface for a token payload.
 *
 * @param {string} user_id - The id of the user.
 * @param {string} email - The email of the user.
 */
export interface TokenPayload {
  user_id: string;
  email: string;
}

export interface BudgetsterContext {
  user?: {
    user_id: string;
    email: string;
    iat: number;
    exp: number;
  };
}
