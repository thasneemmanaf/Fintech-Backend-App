const { testRequest } = require("../testUtils");

describe("Company Routes", () => {
  describe("GET /api/companies", () => {
    it("should return all companies", async () => {
      const response = await testRequest.get("/api/companies");

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });

  describe("GET /api/companies/:id", () => {
    it("should return a company by ID", async () => {
      // First get all companies to get a valid ID
      const companiesResponse = await testRequest.get("/api/companies");
      const companyId = companiesResponse.body.data[0].id;

      const response = await testRequest.get(`/api/companies/${companyId}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("id", companyId);
    });

    it("should return 404 for non-existent company ID", async () => {
      const response = await testRequest.get("/api/companies/non-existent-id");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe("NOT_FOUND");
    });
  });

  describe("GET /api/companies/:id/dashboard", () => {
    it("should return dashboard data for a company", async () => {
      // First get all companies to get a valid ID
      const companiesResponse = await testRequest.get("/api/companies");
      const companyId = companiesResponse.body.data[0].id;

      const response = await testRequest.get(
        `/api/companies/${companyId}/dashboard`
      );

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("company");
      expect(response.body.data).toHaveProperty("card");
      expect(response.body.data).toHaveProperty("transactions");
    });
  });
});
