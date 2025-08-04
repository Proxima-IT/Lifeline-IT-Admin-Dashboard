import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import notfound from "../assets/errorpage.jpg";


export default function NotFound({ error }) {
  return (
    <div className="text-center p-2 bg-[#121e3b] h-screen flex flex-col justify-center">
      <img src={notfound} alt="" className="md:w-1/2 mx-auto" />
      <div className="mx-auto lg:w-1/6 w-3/4 md:w-2/6">
        <Link
          to="/"
          className="bg-white text-[#0B254C] text-lg font-bold px-2 py-2 rounded-md flex items-center gap-3 justify-center "
        >
          <FaHome></FaHome> Back To Home
        </Link>
      </div>
    </div>
  );
}
