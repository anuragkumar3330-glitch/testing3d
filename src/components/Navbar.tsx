import { ArrowRight, Lightbulb, Menu, Search, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = ['Home', 'Who We Are', 'What We Do', 'Industries', 'Facilities', 'Connect With Us'];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed left-0 right-0 top-0 z-50 flex min-h-[74px] items-center justify-between px-5 transition-all duration-300 md:px-8 lg:px-11 ${
          scrolled ? 'bg-[#101010]/82 shadow-[0_14px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl' : 'bg-transparent'
        }`}
      >
        <a href="#" className="flex h-11 min-w-[112px] items-center justify-center rounded-[4px] bg-[#e30613] px-5 text-white shadow-[0_12px_28px_rgba(0,0,0,0.16)] transition-transform duration-300 hover:-translate-y-0.5">
          <span className="text-[22px] font-extrabold leading-none">OSV</span>
        </a>

        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item, index) => (
            <a
              key={item}
              href={index === 0 ? '#' : `#${item.toLowerCase().replaceAll(' ', '-')}`}
              className={`rounded-[4px] px-3 py-2 text-[13px] font-semibold text-white transition-colors duration-200 hover:bg-white/12 ${
                index === 0 ? 'bg-white/12' : ''
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button className="flex h-10 w-14 items-center justify-center rounded-[4px] bg-white/14 text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/24" aria-label="Insights">
            <Lightbulb size={22} />
          </button>
          <a href="#connect-with-us" className="pill-btn pill-btn-red">
            Get A Callback
            <span className="pill-arrow">
              <ArrowRight size={14} />
            </span>
          </a>
          <a href="#customer-login" className="pill-btn pill-btn-peach">
            Customer login
            <span className="pill-arrow bg-white/35">
              <ArrowRight size={14} />
            </span>
          </a>
          <button className="flex h-10 w-10 items-center justify-center rounded-full text-white/90 transition-colors duration-200 hover:bg-white/16" aria-label="Search">
            <Search size={18} />
          </button>
        </div>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-[4px] bg-[#ff5348] text-white shadow-lg md:hidden"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-40 flex flex-col bg-[#101010] px-6 pb-8 pt-28 text-white transition-transform duration-300 md:hidden ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col gap-3">
          {navItems.map((item, index) => (
            <a
              key={item}
              href={index === 0 ? '#' : `#${item.toLowerCase().replaceAll(' ', '-')}`}
              className="flex items-center justify-between border-b border-white/10 py-4 text-xl font-bold"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
              <ArrowRight size={20} className="text-[#ff5348]" />
            </a>
          ))}
        </div>
        <div className="mt-8 grid gap-3">
          <a href="#connect-with-us" className="pill-btn pill-btn-red w-full">
            Get A Callback
          </a>
          <a href="#customer-login" className="pill-btn pill-btn-peach w-full">
            Customer login
          </a>
        </div>
      </div>
    </>
  );
};
