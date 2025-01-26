import { Component } from "react";

export class footer extends Component {
  render() {
    return (
      <footer className="bg-primary-foreground text-primary p-8 dark:bg-background dark:text-foreground grid grid-cols-1 grid-rows-[70% 30%] mb:grid-rows-1">
        <div className="grid grid-cols-2 md:grid-cols-2 place-content-evenly text-[15px] text-center">
          <div className="">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-muted leading-relaxed">(574)304-6758</p>
            <p className="text-sm text-muted leading-relaxed">
              <a href="mailto:xdjaconstructionllc@gmail.com">
                xdjaconstructionllc@gmail.com
              </a>
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4 justify-center">
              <a
                href="https://www.facebook.com/xdjaconstructionllc?mibextid=LQQJ4d"
                className="text-black hover:text-white hover:bg-blue-800 rounded-[5px] transition-all p-2"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-black hover:text-white hover:bg-green-800 rounded-[5px] transition-all p-2"
                aria-label="Twitter"
              >
                Whatsapp
              </a>
            </div>
          </div>
        </div>
        <div className="mt-9 text-center text-sm text-muted">
          © 2023 XDJA construct. All rights reserved.
        </div>
      </footer>
    );
  }
}

export default footer;
