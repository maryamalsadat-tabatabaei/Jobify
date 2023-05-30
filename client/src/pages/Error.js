import { Link } from "react-router-dom";
import img from "../assets/images/not-found.svg";
import Wrapper from "../assets/wrappers/ErrorPage";
import { useLocation } from "react-router-dom";

const Error = () => {
  const { state } = useLocation();
  const { msg } = state || '';
  return (
    <Wrapper className="full-page">
      <div>
        <img src={img} alt="not found" />
        <h3>Oops! page not found</h3>
        <p>{msg || "We can't seem to find the page you're looking for"}</p>
        <Link to="/">back home</Link>
      </div>
    </Wrapper>
  );
};

export default Error;
