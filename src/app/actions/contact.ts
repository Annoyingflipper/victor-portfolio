"use server";

import { Resend } from "resend";
import { z } from "zod";
import { profile, type Locale } from "@/content/profile";

export type ContactValues = { name: string; email: string; message: string };

export type ContactState =
  | { status: "idle" }
  | { status: "sent" }
  | {
      status: "invalid";
      fields: Partial<Record<keyof ContactValues, true>>;
      values: ContactValues;
    }
  | { status: "error"; values: ContactValues };

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(5000),
});

/** Seconds a human needs at least to fill the form. Faster submits are treated as bots. */
const MIN_FILL_SECONDS = 3;

export async function sendContact(_prev: ContactState, form: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field.
  if (form.get("company")) return { status: "sent" };
  const startedAt = Number(form.get("startedAt"));
  if (startedAt && Date.now() - startedAt < MIN_FILL_SECONDS * 1000) return { status: "sent" };

  const values: ContactValues = {
    name: String(form.get("name") ?? ""),
    email: String(form.get("email") ?? ""),
    message: String(form.get("message") ?? ""),
  };
  const parsed = schema.safeParse(values);
  if (!parsed.success) {
    const fields: Partial<Record<"name" | "email" | "message", true>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (key === "name" || key === "email" || key === "message") fields[key] = true;
    }
    return { status: "invalid", fields, values };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY is not set");
    return { status: "error", values };
  }

  const lang = (form.get("lang") === "es" ? "es" : "en") as Locale;
  const { name, email, message } = parsed.data;

  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL ?? profile.contact.email,
    replyTo: email,
    subject: `Portfolio message from ${name}`,
    text: `${message}\n\n— ${name} <${email}> · sent from the ${lang.toUpperCase()} site`,
  });

  if (error) {
    console.error("[contact] Resend error:", error.name);
    return { status: "error", values };
  }
  return { status: "sent" };
}
