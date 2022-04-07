import { configure } from "@goodtechsoft/micro-service";

export default configure(({ HOST, PORT, S3HOST, S3PORT }) => ({
  bs_auth_service: {
    VERSION: "v1",
    HOST   : HOST || `bs-auth-service.${process.env.NAMESPACE}`,
    PORT   : PORT || 30981,
    API_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYnMtYXV0aC1zZXJ2aWNlIn0.Fc2P9J81A8g-WFkZpB9czW0VBg_OunH3K6q3XO7orBg"
  },
  bs_s3_service: {
    VERSION: "v1",
    HOST   : S3HOST || `bs-s3-service.${process.env.NAMESPACE}`,
    PORT   : S3PORT || PORT || 80,
    API_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYnMtczMtc2VydmljZSJ9.U5IeTEWccDmWETqnQQ1CUmab516kr8H3DSr2zl6UMKM"
  },
  bs_invoice_service: {
    VERSION: "v1",
    HOST   : HOST || `bs-invoice-service.${process.env.NAMESPACE}`,
    PORT   : PORT || 30984,
    API_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYnMtaW52b2ljZS1zZXJ2aWNlIn0.lSXBegufwQ4fvbtz09QnLQzGeBQKkNWOQlr8H7yESnc"
  },
  bs_integration_service: {
    VERSION: "v1",
    HOST   : HOST || `bs-integration-service.${process.env.NAMESPACE}`,
    PORT   : PORT || 30983,
    API_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYnMtaW50ZWdyYXRpb24tc2VydmljZSJ9.wPDgo5LviVrlaGCY0irQlm7p-xrNPWp130IGHvmIYQ4"
  },
  bs_partner_service: {
    VERSION: "v1",
    HOST   : HOST || `bs-partner-service.${process.env.NAMESPACE}`,
    PORT   : PORT || 30985,
    API_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYnMtcGFydG5lci1zZXJ2aWNlIn0.hn0SOtmI14odhapfWD7oQ0M8X01RPvvVzO3fpsVOT9E"
  },
  bs_datasource_service: {
    VERSION: "v1",
    HOST   : HOST || `bs-datasource-service.${process.env.NAMESPACE}`,
    PORT   : PORT || 30982,
    API_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYnMtZGF0YXNvdXJjZS1zZXJ2aWNlIn0.WNhhzT5OhIrOnVyyjVhlnjWlSQlUEhONCOnTo-s16wg"
  },
  bs_audit_service: {
    VERSION: "v1",
    HOST   : HOST || `bs-audit-service.${process.env.NAMESPACE}`,
    PORT   : PORT || 30992,
    API_KEY: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYnMtYXVkaXQtc2VydmljZSJ9.qVSH47vq4BmRrfZqIrdsNOvxNjUo8nOJEpl7nRb0qgw"
  },
}), {
  development: {
    HOST  : "http://127.0.0.1",
    S3HOST: "http://127.0.0.1",
    S3PORT: 30988
  },
  test: {
    PORT: 80
  },
  dev: {
    S3HOST: "http://172.16.100.23",
    PORT  : 80,
    S3PORT: 30211
  },
  dev_gke: {
    PORT: 80
  },
  bs_dev: {
    PORT: 80
  },
  production: {}
});
