"use server";

import { z } from 'zod'
 
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type State = {
  message: string;
  error?: {
    email?: string;
    password?: string;
  };
  success?: boolean;
}

export default async function login(prevState: State, formData: FormData): Promise<State> {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      message: "Invalid input",
      error: {
        email: validatedFields.error.flatten().fieldErrors.email?.[0],
        password: validatedFields.error.flatten().fieldErrors.password?.[0],
      }
    };
  }

  const { email, password } = validatedFields.data;

  // dummy error case
  if (email === "test@test.com") {
    return {
      message: "Invalid credentials",
      error: {
        email: "Invalid email",
      }
    };
  }

  if (password === "password") {
    return {
      message: "Invalid credentials",
      error: {
        password: "Invalid password",
      }
    };
  }

  // dummy waiting time
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    message: "Success! Redirecting...",
    success: true,
  };
}
