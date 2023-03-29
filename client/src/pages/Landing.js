import { Link } from "react-router-dom";
import main from "../assets/images/main.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            Job <span>tracking</span> app
          </h1>
          <p></p>
          <Link to="/dashboard" className="btn btn-hero">
            register/login
          </Link>
        </div>
        <img src={main} alt="job hunting" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
