import Link from "next/link";

const Navbar = () => {
  return (
    <header className="sticky top-0 bg-[#D90115] p-4 border-b border-gray-200 z-50">
      <nav className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="font-bold text-lg text-black">
            <Link href="https://elisebuilimmobilierguadeloupe.com">Votre solution clé en main !</Link>
          </div>

          {/* Mobile menu button (Checkbox Hack) */}
          <input type="checkbox" id="menu-toggle" className="hidden peer" />
          <label htmlFor="menu-toggle" className="md:hidden cursor-pointer">
            {/* Hamburger Icon (SVG) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-black"
            >
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </label>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLinks />
          </div>
        </div>

        {/* Mobile Navigation Links - controlled by CSS */}
        <div className="hidden peer-checked:block md:hidden mt-4 space-y-4">
          <NavLinks />
        </div>
      </nav>
    </header>
  );
};

const NavLinks = () => (
  <>
    <Link href="https://elisebuilimmobilierguadeloupe.com/Vendre" className="block text-black hover:text-gray-300">
      Vendre
    </Link>
    <Link href="https://elisebuilimmobilierguadeloupe.com/Acheter" className="block text-black hover:text-gray-300">
      Acheter
    </Link>
    <Link href="https://blog.elisebuilimmobilierguadeloupe.com" className="block text-black hover:text-gray-300">
      Actualités
    </Link>
    <Link href="https://elisebuilimmobilierguadeloupe.com/EliseBUIL" className="block text-black hover:text-gray-300">
      Elise BUIL
    </Link>
    <a href="tel:+590690590565" className="block text-black hover:text-gray-300">
      <span className="md:hidden">Appeler</span>
      <span className="hidden md:inline">+590 690 590 565</span>
      {/* Phone Icon (SVG) */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="inline-block ml-2 h-4 w-4 md:hidden"
      >
        <path d="M22 16.92a5 5 0 0 1-1.41 3.59c-.36.36-.81.63-1.29.8a4.93 4.93 0 0 1-3.67-.16 17.37 17.37 0 0 1-7.5-7.5 4.93 4.93 0 0 1-.16-3.67c.17-.48.44-.93.8-1.29A5 5 0 0 1 7.08 2H10a2 2 0 0 1 2 2v2a2 2 0 0 1-.59 1.41l-.71.71a15.27 15.27 0 0 0 7.5 7.5l.71-.71A2 2 0 0 1 19 12h2a2 2 0 0 1 2 2v2z" />
      </svg>
    </a>
    <Link
      href="https://elisebuilimmobilierguadeloupe.com/Estimation"
      className="block bg-black text-white px-4 py-2 rounded-lg font-bold text-center"
    >
      Estimer votre bien
    </Link>
  </>
);

export default Navbar;
