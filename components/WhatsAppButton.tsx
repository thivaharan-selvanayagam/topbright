import settings from "@/data/settings.json";

export default function WhatsAppButton() {
  const message = encodeURIComponent(
    "Hi Lavanya Teacher, I'd like to know more about your ICT classes."
  );
  const href = `https://wa.me/${settings.whatsapp}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Lavanya on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-0 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition-all hover:gap-3 hover:pr-5 focus-ring"
    >
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full">
        <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor" aria-hidden="true">
          <path d="M16.02 3C9.4 3 4.03 8.37 4.03 15c0 2.29.63 4.44 1.72 6.27L3 29l7.94-2.65A11.9 11.9 0 0 0 16.02 27C22.64 27 28 21.63 28 15S22.64 3 16.02 3Zm0 21.8a9.75 9.75 0 0 1-4.97-1.36l-.36-.21-4.7 1.57 1.53-4.58-.23-.38A9.73 9.73 0 0 1 5.98 15c0-5.53 4.5-10.03 10.04-10.03S26.06 9.47 26.06 15 21.56 24.8 16.02 24.8Zm5.5-7.46c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.78.97-.96 1.17-.18.2-.35.22-.65.07-.3-.15-1.28-.47-2.43-1.5-.9-.8-1.5-1.79-1.68-2.09-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.68-1.64-.93-2.24-.24-.58-.49-.5-.68-.51h-.58c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5s1.08 2.9 1.23 3.1c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.29.18-1.42-.07-.13-.27-.2-.57-.35Z" />
        </svg>
      </span>
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium group-hover:inline group-hover:max-w-xs">
        Chat on WhatsApp
      </span>
    </a>
  );
}
