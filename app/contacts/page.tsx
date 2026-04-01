import { redirect } from "next/navigation";
import { defaultLocale } from "@/app/i18n/locales";

export default function RootContacts() {
  redirect(`/${defaultLocale}/contacts`);
}
