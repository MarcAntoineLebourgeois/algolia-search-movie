export const getHeaders = (): Headers => {
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Access-Control-Allow-Origin", "*");
  return headers;
};
