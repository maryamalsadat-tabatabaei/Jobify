import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, Loading, ChartsContainer } from "../../components";

const ShowStatus = () => {
  const { status, monthlyStataus, isLoading, showStatus } = useAppContext();
  useEffect(() => {
    showStatus();
  }, [status, monthlyStataus]);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyStataus.length > 0 && <ChartsContainer />}
    </>
  );
};

export default ShowStatus;
