export const environment = process.env.NODE_ENV || "development";
export const backendUrl =
  process.env.NODE_ENV === "production"
    ? `<herokuLink>`
    : "https://localhost:8080/";
