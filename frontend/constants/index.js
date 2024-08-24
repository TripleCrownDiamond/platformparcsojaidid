import { auth } from "@clerk/nextjs/server";

export const baseUrl = "http://127.0.0.1:1337";
export const { userId } = auth();
