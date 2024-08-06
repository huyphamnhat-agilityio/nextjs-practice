import Link from "next/link";
import {
  FacebookLogoIcon,
  InstagramLogoIcon,
  LocationIcon,
  TelephoneIcon,
  TwitterLogoIcon,
} from "../common/Icons";
import { EmailIcon } from "../common/Icons/EmailIcon";

const Footer = () => {
  return (
    <footer>
      <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl my-0 mx-auto flex flex-col">
        <div className="flex flex-wrap flex-col text-center sm:text-start sm:flex-row py-12.5 gap-7.5 justify-between">
          <ul className="min-w-38 flex flex-col gap-2.5">
            <li className="text-foreground text-base font-bold pb-2.5">
              Company Info
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold hover:text-primary">
              <Link href="#">About Us</Link>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <Link href="#">Carrier</Link>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <Link href="#">We are hiring</Link>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <Link href="#">Blogs</Link>
            </li>
          </ul>
          <ul className="min-w-38 flex flex-col gap-2.5">
            <li className="text-foreground text-base font-bold pb-2.5">
              Legal
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold hover:text-primary">
              <Link href="#">About Us</Link>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <Link href="#">Carrier</Link>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <Link href="#">We are hiring</Link>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <Link href="#">Blogs</Link>
            </li>
          </ul>
          <ul className="min-w-38 flex flex-col gap-2.5">
            <li className="text-foreground text-base font-bold pb-2.5">
              Features
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold hover:text-primary">
              <Link href="#">Business Marketing</Link>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <Link href="#">User Analytic</Link>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <Link href="#">Live Chat</Link>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <Link href="#">Unlimited Support</Link>
            </li>
          </ul>
          <ul className="min-w-38 flex flex-col gap-2.5">
            <li className="text-foreground text-base font-bold pb-2.5">
              Resources
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold hover:text-primary">
              <Link href="#">IOS & Android</Link>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <Link href="#">Watch a Demo</Link>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <Link href="#">Customers</Link>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <Link href="#">API</Link>
            </li>
          </ul>
          <ul className="min-w-38 flex flex-col gap-2.5">
            <li className="text-foreground text-base font-bold pb-2.5">
              Get In Touch
            </li>
            <li className="flex gap-2.5 justify-center sm:justify-normal text-foreground-100 text-sm/6 font-bold hover:text-primary">
              <TelephoneIcon />
              <Link href="tel:+480550103">(480) 555-0103</Link>
            </li>
            <li className="flex gap-2.5 justify-center sm:justify-normal text-foreground-100 text-sm/6 font-bold ">
              <LocationIcon />
              4517 Washington Ave. Manchester,
              <br />
              Kentucky 39495
            </li>
            <li className="flex gap-2.5 justify-center sm:justify-normal text-foreground-100 text-sm/6 font-bold hover:text-primary">
              <EmailIcon />
              <Link href="mailto:debra.holt@example.com">
                debra.holt@example.com
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Reference https://stackoverflow.com/a/31391593 */}
      <div className="w-[calc(100vw-20px)] ml-[calc(-50vw+50%+10px)] bg-foreground-400">
        <div className="max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center sm:flex-row py-6.25 sm:justify-between gap-2 sm:gap-0 my-0 mx-auto ">
          <p className="text-foreground-100 text-sm/6 font-bold text-center sm:text-start">
            Made With Love By Figmaland All Right Reserved
          </p>
          <div className="flex gap-5 m-auto sm:m-0">
            <Link href="#">
              <FacebookLogoIcon />
            </Link>
            <Link href="#">
              <InstagramLogoIcon />
            </Link>
            <Link href="#">
              <TwitterLogoIcon />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
