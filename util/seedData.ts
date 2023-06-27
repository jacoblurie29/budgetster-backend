import { MonetaryItemCategory } from "../types/types";

export const monetaryItemSeedData = [
  {
    name: "Rent",
    value: 1000,
    date: new Date("2021-01-01").toISOString(),
    repeat: true,
    repeatPeriod: "monthly",
    repeatEndDate: new Date("2021-12-31").toISOString(),
    type: MonetaryItemCategory.EXPENSE,
  },
  {
    name: "Groceries",
    value: 200,
    date: new Date("2021-01-01").toISOString(),
    repeat: true,
    repeatPeriod: "weekly",
    repeatEndDate: new Date("2021-12-31").toISOString(),
    type: MonetaryItemCategory.EXPENSE,
  },
  {
    name: "Netflix",
    value: 10,
    date: new Date("2021-01-01").toISOString(),
    repeat: true,
    repeatPeriod: "monthly",
    repeatEndDate: new Date("2021-12-31").toISOString(),
    type: MonetaryItemCategory.EXPENSE,
  },
  {
    name: "Spotify",
    value: 10,
    date: new Date("2021-01-01").toISOString(),
    repeat: true,
    repeatPeriod: "monthly",
    repeatEndDate: new Date("2021-12-31").toISOString(),
    type: MonetaryItemCategory.EXPENSE,
  },
  {
    name: "Salary",
    value: 2000,
    date: new Date("2021-01-01").toISOString(),
    repeat: true,
    repeatPeriod: "monthly",
    repeatEndDate: new Date("2021-12-31").toISOString(),
    type: MonetaryItemCategory.INCOME,
  },
  {
    name: "Grading papers",
    value: 50,
    date: new Date("2021-01-01").toISOString(),
    repeat: true,
    repeatPeriod: "weekly",
    repeatEndDate: new Date("2021-12-31").toISOString(),
    type: MonetaryItemCategory.INCOME,
  },
  {
    name: "Bonus",
    value: 500,
    date: new Date("2021-01-01").toISOString(),
    repeat: false,
    repeatEndDate: new Date("2021-12-31").toISOString(),
    type: MonetaryItemCategory.INCOME,
  },
  {
    name: "401k",
    value: 1000,
    date: new Date("2021-01-01").toISOString(),
    repeat: true,
    repeatPeriod: "monthly",
    repeatEndDate: new Date("2021-12-31").toISOString(),
    type: MonetaryItemCategory.INVESTMENT,
  },
];
