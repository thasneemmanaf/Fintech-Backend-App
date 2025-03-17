const { testRequest } = require("../testUtils");

describe("Error Handler Middleware", () => {
  it("should return 404 for non-existent routes", async () => {
    const response = await testRequest.get("/api/non-existent-route");

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toHaveProperty("message");
    expect(response.body.error).toHaveProperty("code", "NOT_FOUND");
  });
});
