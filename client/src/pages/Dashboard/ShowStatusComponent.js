import { useEffect } from "react";
import { useAppContext } from "../../context/appContext";
import { StatsContainer, Loading, ChartsContainer } from "../../components";

const ShowStatusComponent = () => {
  const { monthlyStats, isLoading, showStatus } = useAppContext();

  useEffect(() => {
    showStatus();
  }, []);

  if (isLoading) {
    return <Loading center />;
  }
  return (
    <>
      <StatsContainer />
      {monthlyStats.length > 0 && <ChartsContainer />}
    </>
  );
};

export default ShowStatusComponent;
