type Link = {
  name: string;
  href: string;
};

const links: Link[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Family Tree",
    href: "/family-tree",
  },

  { name: "About Us", href: "/about-us" },
  {
    name: "Contact Us",
    href: "/contact-us",
  },
  {
    name: "Login",
    href: "/signin",
  },
  { name: "Register", href: "/signup" },
];

export default links;
