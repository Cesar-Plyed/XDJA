import { Component } from "react";
import "../Styles/navBar.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { iconLd } from "../assets/Icon/iconLoad";

const icon: string = iconLd.src;

function Image({
  src
}: {
  id: number;
  src: string;
}){
  return (
    <LazyLoadImage
      src={src}
      alt="XDJA"
      width={100}
      height={100}
      className="w-[6vw]"
    />
  );
}

export default class navBarPh extends Component {
  
  render() {
    return (
      <nav className="navBarPh w-full h-full row-span-[1/2]">
        <header className="flex justify-between items-center mb-8">
          <div className="text-xl font-bold">
            <Image id={1} src={icon}/>
          </div>
          <nav className="space-x-4">
            <a href="#" className="text-muted hover:text-muted-foreground">
              About
            </a>
            <a href="#" className="text-muted hover:text-muted-foreground">
              Services
            </a>
            <a href="#" className="text-muted hover:text-muted-foreground">
              Pages
            </a>
            <a href="#" className="text-muted hover:text-muted-foreground">
              Portfolio
            </a>
            <a href="#" className="text-muted hover:text-muted-foreground">
              Blog
            </a>
            <a href="#" className="text-muted hover:text-muted-foreground">
              Features
            </a>
            <a href="#" className="text-muted hover:text-muted-foreground">
              Shop
            </a>
          </nav>
        </header>
      </nav>
    );
  }
}
