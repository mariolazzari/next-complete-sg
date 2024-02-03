import homeImg from "../../public/home.jpg";
import Hero from "@/components/hero";

export default function HomePage() {
  return (
    <Hero
      title="Professional Cloud Hosting"
      imgData={homeImg}
      imgAlt="Car factory"
    />
  );
}
