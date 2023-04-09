import styled from "styled-components";

const Wrapper = styled.section`
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 400px;
    border-top: 5px solid var(--primary-500);
  }

  h3 {
    text-align: center;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }

  .image-upload.center {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .btn {
      align-self: center;
      background-color: var(--grey-700);
    }
  }

  .image-upload__preview {
    width: 13rem;
    height: 13rem;
    border: 1px solid var(--primary-500);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin-bottom: 1rem;
  }

  .image-upload__preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .authentication__action {
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
  }

  .text {
    font-size: 14px;
    color: #2c444e;
    padding: 0;
  }

  .google_btn {
    width: 230px;
    height: 40px;
    border-radius: 5px;
    border: none;
    outline: none;
    background-color: white;
    box-shadow: rgb(0 0 0 / 20%) 0px 3px 1px -2px,
      rgb(0 0 0 / 14%) 0px 2px 2px 0px, rgb(0 0 0 / 12%) 0px 1px 5px 0px;
    font-size: 16px;
    font-weight: 500;
    margin: 0 0 20px 0;
    color: #2c444e;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .google_btn > span {
    margin-left: 10px;
  }
`;
export default Wrapper;
