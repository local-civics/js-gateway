/**
 * @jest-environment jsdom
 */

import { createServer, Registry, Server } from "miragejs";
import { AnyModels, AnyFactories } from "miragejs/-types";
import { identity } from "./identity";

let server: Server<Registry<AnyModels, AnyFactories>>;
beforeAll(() => {
  server = createServer({
    environment: "test",
    routes() {
      this.namespace = "/identity/v0";
      this.get("/resolve", () => {
        return {};
      });
      this.get("/users/:username", () => {
        return {};
      });
      this.get("/communities/:communityId/users", () => {
        return [{}];
      });
      this.put("/users/:identityId", () => {
        return null;
      });
      this.get("/communities", () => {
        return [{}];
      });
    },
  });
});

afterAll(() => {
  server.shutdown();
});

describe("identity", () => {
  describe("resolve", () => {
    it("is ok", async () => {
      const svc = identity();
      const id = await svc.resolve();
      expect(id).not.toBeUndefined();
    });

    it("is ok with fields", async () => {
      const svc = identity();
      const id = await svc.resolve(["id"]);
      expect(id).not.toBeUndefined();
    });

    it("is not ok", async () => {
      const svc = identity({ baseURL: "/" });
      await svc.resolve(["id"]).catch(() => {});
    });
  });

  describe("user", () => {
    it("is ok", async () => {
      const svc = identity();
      const id = await svc.user("foo");
      expect(id).not.toBeUndefined();
    });

    it("is ok with fields", async () => {
      const svc = identity();
      const id = await svc.user("foo", ["id"]);
      expect(id).not.toBeUndefined();
    });
  });

  describe("users", () => {
    it("is ok", async () => {
      const svc = identity();
      const identities = await svc.users("foo");
      expect(identities).toHaveLength(1);
    });

    it("is ok with fields", async () => {
      const svc = identity();
      const identities = await svc.users("foo", {}, ["id"]);
      expect(identities).toHaveLength(1);
    });
  });

  describe("save", () => {
    it("is ok", async () => {
      const svc = identity();
      await svc.save("me", {});
    });
  });

  describe("communities", () => {
    it("is ok", async () => {
      const svc = identity();
      const communities = await svc.communities();
      expect(communities).toHaveLength(1);
    });

    it("is ok with fields", async () => {
      const svc = identity();
      const communities = await svc.communities({}, ["id"]);
      expect(communities).toHaveLength(1);
    });
  });

  describe("community", () => {
    it("is ok", async () => {
      const svc = identity();
      const community = await svc.community("foo");
      expect(community).not.toBeUndefined();
    });

    it("is ok with fields", async () => {
      const svc = identity();
      const community = await svc.community("foo", ["id"]);
      expect(community).not.toBeUndefined();
    });
  });
});