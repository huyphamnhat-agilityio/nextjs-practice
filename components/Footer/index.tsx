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
              <a href="#">About Us</a>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <a href="#">Carrier</a>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <a href="#">We are hiring</a>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <a href="#">Blogs</a>
            </li>
          </ul>
          <ul className="min-w-38 flex flex-col gap-2.5">
            <li className="text-foreground text-base font-bold pb-2.5">
              Legal
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold hover:text-primary">
              <a href="#">About Us</a>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <a href="#">Carrier</a>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <a href="#">We are hiring</a>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <a href="#">Blogs</a>
            </li>
          </ul>
          <ul className="min-w-38 flex flex-col gap-2.5">
            <li className="text-foreground text-base font-bold pb-2.5">
              Features
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold hover:text-primary">
              <a href="#">Business Marketing</a>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <a href="#">User Analytic</a>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <a href="#">Live Chat</a>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <a href="#">Unlimited Support</a>
            </li>
          </ul>
          <ul className="min-w-38 flex flex-col gap-2.5">
            <li className="text-foreground text-base font-bold pb-2.5">
              Resources
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold hover:text-primary">
              <a href="#">IOS & Android</a>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <a href="#">Watch a Demo</a>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <a href="#">Customers</a>
            </li>
            <li className="text-foreground-100 text-sm/6 font-bold  hover:text-primary">
              <a href="#">API</a>
            </li>
          </ul>
          <ul className="min-w-38 flex flex-col gap-2.5">
            <li className="text-foreground text-base font-bold pb-2.5">
              Get In Touch
            </li>
            <li className="flex gap-2.5 justify-center sm:justify-normal text-foreground-100 text-sm/6 font-bold hover:text-primary">
              <TelephoneIcon />
              <a href="tel:+480550103">(480) 555-0103</a>
            </li>
            <li className="flex gap-2.5 justify-center sm:justify-normal text-foreground-100 text-sm/6 font-bold whitespace-pre-line">
              <LocationIcon />
              {`4517 Washington Ave. Manchester,
              Kentucky 39495`}
            </li>
            <li className="flex gap-2.5 justify-center sm:justify-normal text-foreground-100 text-sm/6 font-bold hover:text-primary">
              <EmailIcon />
              <a href="mailto:debra.holt@example.com">debra.holt@example.com</a>
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
            <a href="#" aria-label="Go to Facebook page of the company">
              <FacebookLogoIcon />
            </a>
            <a href="#" aria-label="Go to Instagram page of the company">
              <InstagramLogoIcon />
            </a>
            <a href="#" aria-label="Go to Twitter page of the company">
              <TwitterLogoIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
