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
`;
export default Wrapper;
