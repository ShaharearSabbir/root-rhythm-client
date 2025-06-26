
import { Link } from "react-router";
import logo from "../../assets/logo.png";

const BrandLogo = () => {
  return (
    <Link
      to={`/`}
      className="btn btn-ghost text-xl md:text-2xl lg:text-3xl text-primary font-bold flex"
    >
      <img className="w-10" src={logo} alt="" />
      <h1 className="hidden lg:inline">
        <span className="font-light ">Root</span>Rhythm
      </h1>
    </Link>
  );
};

export default BrandLogo;
