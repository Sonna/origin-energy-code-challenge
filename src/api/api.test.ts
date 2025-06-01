import axios from "axios";
import http from "http";
import { AddressInfo } from "net";

import { createTestServer } from "./../../test/testServer";

let server: http.Server;
let baseURL: string;

beforeAll(async () => {
  const app = await createTestServer();
  server = app.listen(0); // use dynamic port
  const { port } = server.address() as AddressInfo;
  baseURL = `http://localhost:${port}`;
});

afterAll(() => {
  server.close();
});

describe("GET /api/energy-accounts", () => {
  it("should return 200 and an array of accounts with charges", async () => {
    const res = await axios.get(`${baseURL}/api/energy-accounts`);

    expect(res.status).toBe(200);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.data)).toBe(true);

    for (const account of res.data) {
      expect(account).toHaveProperty("id");
      expect(account).toHaveProperty("type");
      expect(account).toHaveProperty("address");

      expect(account).toHaveProperty("dueCharges");
      expect(Array.isArray(account.dueCharges)).toBe(true);

      for (const charge of account.dueCharges) {
        expect(charge).toHaveProperty("id");
        expect(charge).toHaveProperty("amount");
        expect(charge).toHaveProperty("date");
      }
    }
  });
});
