import { z } from "zod";

const payload = {
  body: z.object({
    username: z
      .string({
        required_error: "username is required",
      })
      .min(3, "username too short - 3 chars minimum"),
    password: z
      .string({
        required_error: "password is required",
      })
      .min(6, "password too short - 6 chars minimum"),
  }),
};

export const authSchema = z.object({
  ...payload,
});
