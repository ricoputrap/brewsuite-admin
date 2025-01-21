"use server";

import { z } from 'zod'
 
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export default async function login(formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email, password } = validatedFields.data;

  const errors = {
    email: "",
    password: "",
  }

  // dummy error case
  if (email === "test@test.com") {
    errors.email = "Invalid email";
  }

  if (password === "password") {
    errors.password = "Invalid password";
  }

  // dummy waiting time
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (Object.values(errors).some(Boolean)) {
    return {
      error: errors,
    };
  }

  // dummy login
  return {
    success: true,
  };
}
