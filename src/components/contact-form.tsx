"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/profile";
import { profile } from "@/content/profile";
import { sendContact, type ContactState } from "@/app/actions/contact";

const copy = {
  name: { en: "Your name", es: "Tu nombre" },
  email: { en: "Your email", es: "Tu email" },
  message: { en: "Message", es: "Mensaje" },
  placeholder: {
    en: "The role, the team, and what you'd like me to test.",
    es: "El rol, el equipo y qué te gustaría que probara.",
  },
  send: { en: "Send message", es: "Enviar mensaje" },
  sending: { en: "Sending…", es: "Enviando…" },
  sent: {
    en: "Message sent. I'll reply to the email you gave me, usually within a day.",
    es: "Mensaje enviado. Te respondo al email que me diste, normalmente en un día.",
  },
  sendAnother: { en: "Send another message", es: "Enviar otro mensaje" },
  invalid: {
    en: "Check the highlighted fields: a name, a valid email and a message of at least 10 characters.",
    es: "Revisa los campos marcados: un nombre, un email válido y un mensaje de al menos 10 caracteres.",
  },
  error: {
    en: "The message didn't go through. Email me directly at",
    es: "El mensaje no se pudo enviar. Escríbeme directo a",
  },
};

const field =
  "w-full border-0 border-b bg-transparent px-0 py-3 text-lg outline-none transition-colors placeholder:text-ink-muted/70";

export function ContactForm({ lang }: { lang: Locale }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(sendContact, {
    status: "idle",
  });
  const startedAt = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);
  const [dismissed, setDismissed] = useState<ContactState | null>(null);
  const invalid = state.status === "invalid" ? state.fields : {};
  // Controlled fields: React resets uncontrolled ones after every action, which would wipe a failed message.
  const [values, setValues] = useState({ name: "", email: "", message: "" });
  const bind = (key: keyof typeof values) => ({
    name: key,
    value: values[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((v) => ({ ...v, [key]: e.target.value })),
    "aria-invalid": invalid[key] ?? false,
    className: `${field} ${invalid[key] ? "border-bug focus:border-bug" : "border-rule focus:border-ink"}`,
  });

  if (state.status === "sent" && dismissed !== state) {
    return (
      <div role="status" className="border-t border-ink pt-6" data-testid="contact-sent">
        <p className="font-mono text-sm text-pass">✓ 200 OK</p>
        <p className="mt-3 text-lg">{copy.sent[lang]}</p>
        <button
          type="button"
          onClick={() => {
            setValues({ name: "", email: "", message: "" });
            setDismissed(state);
          }}
          className="mt-6 border-b border-ink pb-0.5 text-[15px] hover:border-transparent"
        >
          {copy.sendAnother[lang]}
        </button>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-6" noValidate data-testid="contact-form">
      <input type="hidden" name="lang" value={lang} />
      <input type="hidden" name="startedAt" ref={startedAt} defaultValue="" />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 overflow-hidden">
        <label>
          Company
          <input type="text" name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <label className="block">
          <span className="font-mono text-xs text-ink-muted">{copy.name[lang]}</span>
          <input {...bind("name")} required minLength={2} autoComplete="name" />
        </label>
        <label className="block">
          <span className="font-mono text-xs text-ink-muted">{copy.email[lang]}</span>
          <input {...bind("email")} type="email" required autoComplete="email" />
        </label>
      </div>
      <label className="block">
        <span className="font-mono text-xs text-ink-muted">{copy.message[lang]}</span>
        <textarea
          {...bind("message")}
          required
          minLength={10}
          rows={4}
          placeholder={copy.placeholder[lang]}
          style={{ resize: "vertical" }}
        />
      </label>

      <div aria-live="polite" className="min-h-6 text-sm">
        {state.status === "invalid" && <p className="text-bug">{copy.invalid[lang]}</p>}
        {state.status === "error" && (
          <p className="text-bug">
            {copy.error[lang]}{" "}
            <a href={`mailto:${profile.contact.email}`} className="underline">
              {profile.contact.email}
            </a>
            .
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="justify-self-start border border-ink bg-ink px-6 py-3 text-[15px] text-paper transition-colors hover:bg-transparent hover:text-ink disabled:opacity-60"
      >
        {pending ? copy.sending[lang] : copy.send[lang]}
      </button>
    </form>
  );
}
