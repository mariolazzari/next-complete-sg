import Hero from "@/components/hero";
import imgScale from "../../../public/scale.jpg";

const ScalePage = () => {
  return (
    <Hero
      title="We serve Scale Applications"
      imgData={imgScale}
      imgAlt="Scale"
    />
  );
};

export default ScalePage;
