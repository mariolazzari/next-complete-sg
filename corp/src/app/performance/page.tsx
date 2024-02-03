import Hero from "@/components/hero";
import imgPerf from "../../../public/performance.jpg";

const PerformancePage = () => {
  return (
    <Hero
      title="We serve Perfomance Applications"
      imgData={imgPerf}
      imgAlt="Performance"
    />
  );
};

export default PerformancePage;
