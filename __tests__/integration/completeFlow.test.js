const { testRequest } = require("../testUtils");

describe("Integration Flow", () => {
  it("should support the complete user flow", async () => {
    // 1. Get all companies
    const companiesResponse = await testRequest.get("/api/companies");
    expect(companiesResponse.status).toBe(200);
    expect(companiesResponse.body.success).toBe(true);

    const companyId = companiesResponse.body.data[0].id;

    // 2. Get dashboard data for a company
    const dashboardResponse = await testRequest.get(
      `/api/companies/${companyId}/dashboard`
    );
    expect(dashboardResponse.status).toBe(200);
    expect(dashboardResponse.body.success).toBe(true);

    // 3. Get cards for company
    const cardsResponse = await testRequest.get(
      `/api/companies/${companyId}/cards`
    );
    expect(cardsResponse.status).toBe(200);
    expect(cardsResponse.body.success).toBe(true);

    if (cardsResponse.body.data.length > 0) {
      const cardId = cardsResponse.body.data[0].id;

      // 4. Get card details
      const cardResponse = await testRequest.get(`/api/cards/${cardId}`);
      expect(cardResponse.status).toBe(200);
      expect(cardResponse.body.success).toBe(true);
    }

    // 5. Get transactions
    const transactionsResponse = await testRequest.get(
      `/api/companies/${companyId}/transactions`
    );
    expect(transactionsResponse.status).toBe(200);
    expect(transactionsResponse.body.success).toBe(true);
  });
});
