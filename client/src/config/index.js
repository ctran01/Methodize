export const environment = process.env.NODE_ENV || "development";
export const backendUrl =
  // "https://methodic-backend.herokuapp.com/";
  process.env.NODE_ENV === "production"
    ? `https://methodic-backend.herokuapp.com/`
    : "http://localhost:8080/";
