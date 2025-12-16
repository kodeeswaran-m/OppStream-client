import type { State, TechRow } from "./LogFormType";

// ----------------------------- ACTION TYPES -----------------------------
export type Action =
  | { type: "SET_FIELD"; field: keyof State; value: any }
  | { type: "ADD_PEOPLE" }
  | { type: "REMOVE_PEOPLE"; index: number }
  | { type: "UPDATE_PEOPLE"; index: number; value: string }
  | { type: "SET_TECHNOLOGIES"; value: string[] }
  | { type: "ADD_TECH_ROW" }
  | { type: "REMOVE_TECH_ROW"; index: number }
  | { type: "UPDATE_TECH_ROW"; index: number; field: keyof TechRow; value: string }
  | { type: "RESET_TECH_ROWS" };

// ----------------------------- REDUCER -----------------------------
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "ADD_PEOPLE":
      return {
        ...state,
        peoplePresent: [...state.peoplePresent, { name: "" }],
      };

    case "REMOVE_PEOPLE":
      return {
        ...state,
        peoplePresent: state.peoplePresent.filter((_:{name:string}, i:number) => i !== action.index),
      };

    case "UPDATE_PEOPLE":
      return {
        ...state,
        peoplePresent: state.peoplePresent.map((p:{name:string}, i:number) =>
          i === action.index ? { name: action.value } : p
        ),
      };

    case "SET_TECHNOLOGIES":
      return {
        ...state,
        selectedTechnologies: action.value,
        techRows: state.techRows.filter((row:TechRow) =>
          action.value.includes(row.technology)
        ),
      };

    case "RESET_TECH_ROWS":
      return { ...state, techRows: [] };

    case "ADD_TECH_ROW":
      if (state.techRows.length >= state.selectedTechnologies.length) {
        return state;
      }

      return {
        ...state,
        techRows: [...state.techRows, { technology: "", count: 0 }],
      };

    case "REMOVE_TECH_ROW":
      return {
        ...state,
        techRows: state.techRows.filter((_:TechRow, i:number) => i !== action.index),
      };

    case "UPDATE_TECH_ROW":
      const updatedRows = state.techRows.map((row:TechRow, i:number) =>
        i === action.index ? { ...row, [action.field]: action.value } : row
      );

      const total = updatedRows.reduce(
        (sum:number, r:TechRow) => sum + Number(r.count || 0),
        0
      );

      return {
        ...state,
        techRows: updatedRows,
        totalPersons: total,
      };

    default:
      return state;
  }
}
