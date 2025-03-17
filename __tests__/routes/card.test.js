const { testRequest } = require("../testUtils");

describe("Card Routes", () => {
  describe("GET /api/companies/:companyId/cards", () => {
    it("should return all cards for a company", async () => {
      // First get all companies to get a valid ID
      const companiesResponse = await testRequest.get("/api/companies");
      const companyId = companiesResponse.body.data[0].id;

      const response = await testRequest.get(
        `/api/companies/${companyId}/cards`
      );

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);

      if (response.body.data.length > 0) {
        expect(response.body.data[0]).toHaveProperty("companyId", companyId);
        // Ensure sensitive data is masked
        expect(response.body.data[0].cardNumber).toMatch(/^\*+\d{4}$/);
        expect(response.body.data[0].cvv).toBe("***");
      }
    });
  });

  describe("GET /api/cards/:id", () => {
    it("should return a card by ID", async () => {
      // First get all companies
      const companiesResponse = await testRequest.get("/api/companies");
      const companyId = companiesResponse.body.data[0].id;

      // Then get cards for this company
      const cardsResponse = await testRequest.get(
        `/api/companies/${companyId}/cards`
      );

      if (cardsResponse.body.data.length > 0) {
        const cardId = cardsResponse.body.data[0].id;

        const response = await testRequest.get(`/api/cards/${cardId}`);

        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toHaveProperty("id", cardId);
        // Ensure sensitive data is masked
        expect(response.body.data.cardNumber).toMatch(/^\*+\d{4}$/);
        expect(response.body.data.cvv).toBe("***");
      } else {
        // Skip if no cards
        console.log("No cards found for testing, skipping card detail test");
      }
    });

    it("should return 404 for non-existent card ID", async () => {
      const response = await testRequest.get("/api/cards/non-existent-id");

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.error.code).toBe("NOT_FOUND");
    });
  });
});
