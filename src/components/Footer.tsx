const columns = [
  ['Who We Are', 'Our Presence', 'Testimonials', 'Certifications', 'Contact Us'],
  ['What We Do', 'OSV Advantage', 'Our Expertise', 'Industries', 'Facilities'],
  ['Career', 'Careers', 'Channel Partners', 'Join our Team', 'Open Positions'],
];

export const Footer = () => {
  return (
    <footer className="bg-[#f5f2ee] px-5 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-10 border-b border-[#dccfc6] pb-12 md:grid-cols-[1.1fr_0.9fr_0.9fr_0.9fr]">
          <div>
            <div className="inline-flex h-12 min-w-[124px] items-center justify-center rounded-[4px] bg-[#e30613] px-5 text-white">
              <span className="text-[24px] font-extrabold leading-none">OSV</span>
            </div>
            <p className="mt-6 max-w-[320px] text-[15px] leading-[1.7] text-[#565656]">
              ONNSYNEX VENTURES PRIVATE LIMITED helps companies eliminate trade hurdles with FTWZ, tax and compliance advantages.
            </p>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase text-[#e30613]">Corporate Office</p>
            <p className="text-sm font-semibold text-[#101010]">ONNSYNEX VENTURES PVT LTD</p>
            <p className="mt-2 text-sm leading-[1.7] text-[#565656]">New Delhi, India</p>
            <p className="mt-5 text-sm leading-[1.7] text-[#565656]">support@onnsynex.com</p>
            <p className="text-sm leading-[1.7] text-[#565656]">+91-7070703922</p>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase text-[#e30613]">Hotline</p>
            <p className="text-sm font-semibold text-[#101010]">Trade & Logistics Support</p>
            <p className="mt-2 text-sm leading-[1.7] text-[#565656]">+91-7070703922</p>
          </div>

          <div>
            <p className="mb-3 text-xs font-bold uppercase text-[#e30613]">Follow us</p>
            {['Facebook', 'Instagram', 'LinkedIn', 'Twitter'].map((social) => (
              <a key={social} href="#" className="block py-1 text-sm text-[#565656] transition-colors hover:text-[#e30613]">
                {social}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 border-b border-[#dccfc6] py-12 md:grid-cols-3">
          {columns.map((links) => (
            <div key={links[0]}>
              <h4 className="mb-5 text-lg font-semibold text-[#101010]">{links[0]}</h4>
              {links.slice(1).map((link) => (
                <a key={link} href="#" className="block py-1.5 text-sm text-[#565656] transition-colors hover:text-[#e30613]">
                  {link}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-5 pt-8 text-xs text-[#565656] md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} OSV FTWZ. All rights reserved.</p>
          <div className="flex flex-wrap gap-5">
            {['Imprint', 'Data protection', 'Terms and Conditions', 'Cookie Policy'].map((link) => (
              <a key={link} href="#" className="transition-colors hover:text-[#e30613]">
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
