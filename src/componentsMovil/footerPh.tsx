import { Component } from "react";

export class footerPh extends Component {
  render() {
    return (
      <footer className="bg-primary-foreground text-primary p-8 dark:bg-background dark:text-foreground">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm text-muted leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <p className="text-sm text-muted leading-relaxed">
              123 Street Name, City, Country
            </p>
            <p className="text-sm text-muted leading-relaxed">
              info@example.com
            </p>
            <p className="text-sm text-muted leading-relaxed">+1 234 567 890</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted hover:text-muted-foreground"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a
                href="#"
                className="text-muted hover:text-muted-foreground"
                aria-label="Twitter"
              >
                Whatsapp
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-muted">
          © 2023 XDJA construct. All rights reserved.
        </div>
      </footer>
    );
  }
}

export default footerPh;
