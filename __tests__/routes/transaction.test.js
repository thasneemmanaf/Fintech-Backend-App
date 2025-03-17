const { testRequest } = require("../testUtils");

describe("Transaction Routes", () => {
  describe("GET /api/companies/:companyId/transactions", () => {
    it("should return transactions for a company with pagination", async () => {
      // First get all companies to get a valid ID
      const companiesResponse = await testRequest.get("/api/companies");
      const companyId = companiesResponse.body.data[0].id;

      const response = await testRequest.get(
        `/api/companies/${companyId}/transactions`
      );

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveProperty("items");
      expect(response.body.data).toHaveProperty("pagination");
      expect(response.body.data.pagination).toHaveProperty("total");
      expect(response.body.data.pagination).toHaveProperty("page");
      expect(response.body.data.pagination).toHaveProperty("limit");
      expect(response.body.data.pagination).toHaveProperty("totalPages");
    });

    it("should respect pagination parameters", async () => {
      // First get all companies to get a valid ID
      const companiesResponse = await testRequest.get("/api/companies");
      const companyId = companiesResponse.body.data[0].id;

      const page = 1;
      const limit = 2; // Small limit to test pagination

      const response = await testRequest.get(
        `/api/companies/${companyId}/transactions?page=${page}&limit=${limit}`
      );

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.pagination.page).toBe(page);
      expect(response.body.data.pagination.limit).toBe(limit);

      // Items array length should match the limit (or be less if there are fewer total items)
      if (response.body.data.pagination.total > limit) {
        expect(response.body.data.items.length).toBe(limit);
      } else {
        expect(response.body.data.items.length).toBe(
          response.body.data.pagination.total
        );
      }
    });
  });
});
