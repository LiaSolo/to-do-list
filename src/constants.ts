export const SERVER_URL = "http://localhost:3000/todos";

export const mapVariantToColor = {
    Primary: "#395B64",
    PrimaryLight: "#A5C9CA",
    Error: "#D57575",
    Success: "#73A584",
};

export const levelByImportance = ["LOW", "MEDIUM", "CRITICAL"] as const;
export type TodoLevel = (typeof levelByImportance)[number];

const states = ["default", "edit", "create"] as const;
export type TodoState = (typeof states)[number];
