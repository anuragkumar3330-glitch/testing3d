import { Mail, MessageCircle, Phone } from 'lucide-react';
import type { ReactNode } from 'react';

const whatsappUrl = 'https://api.whatsapp.com/send/?phone=917070703922&text&type=phone_number&app_absent=0';

const contactItems = [
  {
    label: 'support@onnsynex.com',
    href: 'mailto:support@onnsynex.com',
    icon: Mail,
  },
  {
    label: '+91-7070703922',
    href: whatsappUrl,
    icon: MessageCircle,
  },
  {
    label: '+91-7070703922',
    href: 'tel:+917070703922',
    icon: Phone,
  },
];

const socialItems: { label: string; href: string; icon: ReactNode }[] = [
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/onnsynex',
    icon: <path d="M13.4 8.1h-2.1V6.7c0-.5.3-.7.8-.7h1.2V3.7c-.6-.1-1.2-.1-1.8-.1-1.9 0-3.1 1.1-3.1 3.1v1.4H6.3v2.6h2.1v6.7h2.9v-6.7h1.9l.2-2.6Z" />,
  },
  {
    label: 'Twitter',
    href: 'https://x.com/osv_india',
    icon: <path d="M18.2 6.2v.5c0 5.1-3.9 10.9-10.9 10.9-2.2 0-4.2-.6-5.9-1.7h.9c1.8 0 3.4-.6 4.7-1.6-1.7 0-3.1-1.1-3.6-2.6.2 0 .5.1.8.1.4 0 .7 0 1-.1-1.8-.4-3.1-1.9-3.1-3.8.5.3 1.1.5 1.8.5-1.1-.7-1.7-1.9-1.7-3.2 0-.7.2-1.4.5-1.9 1.9 2.4 4.8 4 8.1 4.1-.1-.3-.1-.6-.1-.9 0-2.1 1.7-3.8 3.8-3.8 1.1 0 2.1.5 2.8 1.2.9-.2 1.7-.5 2.4-.9-.3.9-.9 1.6-1.6 2.1.8-.1 1.5-.3 2.1-.6-.5.7-1.2 1.3-2 1.7Z" />,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/osv_ftwzs/',
    icon: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="4.2" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="2" />
        <circle cx="17" cy="7" r="1.2" />
      </>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/osvftwz',
    icon: <path d="M5.2 8.7h3V19h-3V8.7Zm1.5-4.9a1.7 1.7 0 1 1 0 3.4 1.7 1.7 0 0 1 0-3.4Zm3.7 4.9h2.9v1.4h.1c.4-.8 1.4-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8V19h-3v-5.1c0-1.2 0-2.8-1.7-2.8s-2 1.3-2 2.7V19h-3V8.7Z" />,
  },
  {
    label: 'WhatsApp',
    href: 'https://api.whatsapp.com/send?phone=917070703922',
    icon: <path d="M12.1 3.2a8.7 8.7 0 0 0-7.4 13.2l-1 3.6 3.7-1a8.7 8.7 0 1 0 4.7-15.8Zm0 15.8a7 7 0 0 1-3.6-1l-.3-.2-2.2.6.6-2.1-.2-.3A7.1 7.1 0 1 1 12.1 19Zm3.9-5.3c-.2-.1-1.3-.6-1.5-.7-.2-.1-.4-.1-.5.1l-.7.8c-.1.2-.3.2-.5.1a5.8 5.8 0 0 1-2.9-2.5c-.1-.2 0-.3.1-.5l.4-.4c.1-.1.1-.3.2-.4v-.4l-.7-1.6c-.2-.4-.4-.4-.5-.4H8.9c-.2 0-.4.1-.6.3-.2.2-.8.8-.8 2s.9 2.3 1 2.5a8.1 8.1 0 0 0 3.5 3.1c1.3.5 1.8.6 2.4.5.7-.1 1.3-.5 1.5-1 .2-.5.2-.9.1-1Z" />,
  },
];

export const Footer = () => {
  return (
    <footer id="connect-with-us" className="bg-[#101010] text-white">
      <div
        className="mx-auto"
        style={{ maxWidth: '960px', width: '100%', margin: '0 auto', padding: '56px 24px 52px' }}
      >
        <div
          className="grid grid-cols-1 items-start gap-y-10 md:grid-cols-3"
        >
          {contactItems.map(({ label, href, icon: Icon }) => (
            <a
              key={label + href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex flex-col items-center text-center"
            >
              <Icon
                className="h-10 w-10 text-white transition-transform duration-300 group-hover:-translate-y-0.5 md:h-11 md:w-11"
                strokeWidth={2}
              />
              <span className="mt-4 text-[15px] font-medium leading-tight text-white/78 transition-colors group-hover:text-white sm:text-[16px]">
                {label}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 text-white" style={{ padding: '32px 24px 36px' }}>
        <p className="text-center text-[14px] font-medium text-white/82 md:text-[16px]">
          Copyright © {new Date().getFullYear()} OSV. All Rights Reserved
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {socialItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/16 text-white transition-colors hover:bg-[#b9d522] hover:text-[#101010]"
              aria-label={item.label}
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true">
                {item.icon}
              </svg>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
