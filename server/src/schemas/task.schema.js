import { z } from "zod";

const payload = {
  body: z.object({
    title: z
      .string({
        required_error: "Title is required",
      })
      .min(3, "Title too short - 3 chars minimum"),
    description: z
      .string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string",
      })
      .min(3, "Description too short - 3 chars minimum"),
    status: z.boolean({
      required_error: "Status is required",
    }),
  }),
};

const params = {
  params: z.object({
    taskId: z.string({
      required_error: "taskId is required",
    }),
  }),
};

export const createTaskSchema = z.object({
  ...payload,
});

export const updateTaskSchema = z.object({
  ...{ body: payload.body.omit({ status: true }) },
  ...params,
});

export const taskIdParams = z.object({
  ...params,
});
