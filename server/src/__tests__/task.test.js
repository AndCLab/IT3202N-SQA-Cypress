import supertest from "supertest";
import app from "../app.js";

import * as TaskService from "../services/task.service.js";

jest.mock("../middlewares/authenticateToken.js", () => ({
  authenticateToken: (req, res, next) => {
    req.user = {
      id: 1,
    };
    next();
  },
}));

describe("/task", () => {
  beforeEach(() => jest.clearAllMocks());

  // 1. Read Task
  describe("get all tasks", () => {
    it("should return the list of all the tasks", async () => {
      jest.spyOn(TaskService, "getAllUserTasks").mockResolvedValueOnce([]);
      const { statusCode, body } = await supertest(app).get("/api/task");
      expect(statusCode).toBe(200);
      expect(Array.isArray(body)).toBe(true);
    });
  });

  // 2. Create Task
  describe("create a task", () => {
    describe("given title is empty", () => {
      it("should return a status code 400", async () => {
        const { statusCode } = await supertest(app).post("/api/task").send({
          description: "description",
          status: true,
        });
        expect(statusCode).toBe(400);
      });
    });

    describe("given description is empty", () => {
      it("should return a status code 400", async () => {
        const { statusCode } = await supertest(app).post("/api/task").send({
          title: "title",
          status: true,
        });
        expect(statusCode).toBe(400);
      });
    });

    describe("given status is empty", () => {
      it("should return a status code 400", async () => {
        const { statusCode } = await supertest(app).post("/api/task").send({
          title: "title",
          description: "description",
        });
        expect(statusCode).toBe(400);
      });
    });

    describe("given duplicate title", () => {
      it("should return a status code 409", async () => {
        jest.spyOn(TaskService, "getByTitle").mockResolvedValueOnce(true);

        const { statusCode } = await supertest(app).post("/api/task").send({
          title: "title",
          description: "description",
          status: true,
        });
        expect(statusCode).toBe(409);
      });
    });

    describe("given valid inputs", () => {
      it("should return a status code 201", async () => {
        jest.spyOn(TaskService, "getByTitle").mockResolvedValueOnce(false);
        jest.spyOn(TaskService, "createTask").mockResolvedValueOnce(true);

        const { statusCode } = await supertest(app).post("/api/task").send({
          title: "title",
          description: "description",
          status: true,
        });
        expect(statusCode).toBe(201);
      });
    });
  });

  // 3. Edit Task
  describe("edit a task", () => {
    describe("given title is empty", () => {
      it("should return a status code 400", async () => {
        const { statusCode } = await supertest(app).put("/api/task/xx").send({
          description: "description",
        });
        expect(statusCode).toBe(400);
      });
    });

    describe("given description is empty", () => {
      it("should return a status code 400", async () => {
        const { statusCode } = await supertest(app).put("/api/task/xx").send({
          title: "title",
        });
        expect(statusCode).toBe(400);
      });
    });

    describe("given duplicate title", () => {
      it("should return a status code 409", async () => {
        jest.spyOn(TaskService, "getById").mockResolvedValueOnce(true);
        jest.spyOn(TaskService, "getByTitle").mockResolvedValueOnce(true);

        const { statusCode } = await supertest(app).put("/api/task/xx").send({
          title: "title",
          description: "description",
        });
        expect(statusCode).toBe(409);
      });
    });

    describe('given task not found', () => {
      it('should return a status code 404', async () => {
        jest.spyOn(TaskService, "getById").mockResolvedValueOnce(false);
        const { statusCode } = await supertest(app).put("/api/task/xx").send({
          title: "title",
          description: "description",
        });
        expect(statusCode).toBe(404);
      })
    })


    describe("given valid inputs", () => {
      it("should return a status code 200", async () => {
        jest.spyOn(TaskService, "getById").mockResolvedValueOnce(true);
        jest.spyOn(TaskService, "getByTitle").mockResolvedValueOnce(false);
        jest.spyOn(TaskService, "editTask").mockResolvedValueOnce(true);

        const { statusCode } = await supertest(app).put("/api/task/xx").send({
          title: "title",
          description: "description",
        });
        expect(statusCode).toBe(200);
      });
    });
  });

  // 4. Update Task Status
  describe("Update Task Status", () => {
    describe("given task not found", () => {
      it("should return a status code 404", async () => {
        jest.spyOn(TaskService, "getById").mockResolvedValueOnce(false);
        const { statusCode } = await supertest(app).patch("/api/task/xx");
        expect(statusCode).toBe(404);
      });
    });

    describe("valid inputs", () => {
      it("should return a status code 200", async () => {
        jest
          .spyOn(TaskService, "getById")
          .mockResolvedValue({ status: true });
        jest.spyOn(TaskService, "updateTaskStatus").mockResolvedValueOnce(true);
        const { statusCode } = await supertest(app).patch("/api/task/xx");
        expect(statusCode).toBe(200);
      });
    });
  });

  // 5. Delete Task
  describe("Delete Task", () => {
    describe("given task not found", () => {
      it("should return a status code 404", async () => {
        jest.spyOn(TaskService, "getById").mockResolvedValueOnce(false);
        const { statusCode } = await supertest(app).delete("/api/task/xx");
        expect(statusCode).toBe(404);
      });
    });

    describe("valid inputs", () => {
      it("should return a status code 200", async () => {
        jest
          .spyOn(TaskService, "getById")
          .mockResolvedValue({ status: true });
        jest.spyOn(TaskService, "deleteTask").mockResolvedValueOnce(true);
        const { statusCode } = await supertest(app).delete("/api/task/xx");
        expect(statusCode).toBe(200);
      });
    });
  });


});
