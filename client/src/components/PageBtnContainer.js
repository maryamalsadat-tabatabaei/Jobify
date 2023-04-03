import { useAppContext } from "../context/appContext";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import Wrapper from "../assets/wrappers/PageBtnContainer";

const PageBtnContainer = () => {
  const { numOfPages, page, changePage } = useAppContext();

  const pages = Array.from(numOfPages, (_, index) => index++);

  const handleNextButton = () => {
    const newPage = page === numOfPages ? numOfPages : page++;
    changePage(newPage);
  };
  changePage();
  const handlePrevButton = () => {
    const newPage = page === 1 ? 1 : page--;
    changePage(newPage);
  };
  return (
    <Wrapper>
      <button onClick={handlePrevButton} className="prev-btn">
        <HiChevronDoubleLeft />
        prev
      </button>

      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              key={pageNumber}
              type="button"
              className={pageNumber === page ? "pageBtn active" : "pageBtn"}
              onClick={() => changePage(pageNumber)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      <button onClick={handleNextButton} className="next-btn">
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default PageBtnContainer;
