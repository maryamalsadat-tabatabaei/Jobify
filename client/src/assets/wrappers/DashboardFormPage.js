import styled from "styled-components";

const Wrapper = styled.section`
  border-radius: var(--borderRadius);
  width: 100%;
  background: var(--white);
  padding: 3rem 2rem 4rem;
  box-shadow: var(--shadow-2);

  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
  }

  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    row-gap: 0.5rem;
  }
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }

  .form-header {
    margin-top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .form-header .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    font-size: 1.4rem;
    cursor: pointer;
    box-shadow: var(--shadow-2);
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

  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
    .image-upload.center {
      .btn {
        margin-bottom: 2rem;
      }
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
    .image-upload.center {
      .btn {
        margin-bottom: 2rem;
      }
    }
  }
`;

export default Wrapper;
