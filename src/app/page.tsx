import MainSlider from "./_components/MainSlider/MainSlider";
import SecondSlider from "./_components/SecondSlider/SecondSlider";
import GetAllProducts from "./_components/getAllProducts/GetAllProducts";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <MainSlider />
        <SecondSlider />
        <GetAllProducts />
      </div>
    </div>
  );
}