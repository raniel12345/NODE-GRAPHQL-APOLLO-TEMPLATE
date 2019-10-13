import { expect } from "chai";

import * as userApi from "./api";

describe("users", () => {
  describe("user (id: String!): User", () => {
    it("returns a user when user can be found", async () => {
      const expectedResult = {
        data: {
          user: {
            id: "1",
            username: "rwieruch",
            email: "zbdynv@onsemi.com",
            role: "ADMIN"
          }
        }
      };

      const result = await userApi.user({ id: 1 });

      expect(expectedResult).to.eql(result.data);
    });

    it("returns null when user cannot be found", async () => {
      const expectedResult = {
        data: {
          user: null
        }
      };

      const result = await userApi.user({ id: "31" });
      expect(result.data).to.eql(expectedResult);
    });
  });

  describe("deleteUser(id: String!): Boolean!", () => {
    it("returns an error because only admins can delete a user", async () => {
      const {
        data: {
          data: {
            signIn: { token }
          }
        }
      } = await userApi.signIn({
        login: "ddavids",
        password: "123456789"
      });

      const {
        data: { errors }
      } = await userApi.deleteUser({ id: 1 }, token);

      expect(errors[0].message).to.eql("Not authorized as admin.");
    });
  });
});
