import { FC, useState } from "react";
import "../Styles/navBar.scss";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { iconLd } from "../assets/Icon/iconLoad";
import Popup from "../ComponentsGl/pup";

const NavBarPh: FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const icon: string = iconLd.src;

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  function Image({ src }: { id: number; src: string }) {
    return (
      <LazyLoadImage
        src={src}
        alt="XDJA"
        width={100}
        height={100}
        className="w-[9vw] hover:bg-red-500 rounded-[50%] transition-colors duration-300 cursor-pointer"
        onClick={togglePopup}
      />
    );
  }

  return (
    <nav className="navBarPh w-full h-full row-span-[1/2]">
      <header className="flex justify-between items-center mb-8">
        <div className="text-xl font-bold">
          <Image id={1} src={icon} />
        </div>
      </header>
      {showPopup && (
        <Popup show={showPopup} onClose={togglePopup}>
          <p>Thank you for visiting us.</p>
        </Popup>
      )}
    </nav>
  );
};

export default NavBarPh;
