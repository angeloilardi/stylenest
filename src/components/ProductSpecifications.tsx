import { useMemo, useState } from "react";
import productSpecs from "./../data/product-specs.json";
import {
  RiRecycleFill,
  RiPaintLine,
  RiPlantLine,
  RiWaterFlashLine,
  RiTShirt2Line,
  RiWindyLine,
  RiColorFilterLine,
  RiStackLine,
  RiScales2Line,
  RiShieldStarLine,
  RiPriceTag2Line,
  RiRainbowLine,
  RiShirtLine,
  RiInfinityLine,
  RiShapesLine,
  RiHandHeartLine,
} from "react-icons/ri";

const ProductSpecifications = () => {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const tabContent = useMemo(() => {
    return productSpecs[currentTabIndex];
  }, [currentTabIndex]);

  const imgUrl = (size: string) =>
    `/assets/images/${tabContent.image}-${size}.jpg`;

  const Icons = {
    recycle: RiRecycleFill,
    lowImpact: RiPaintLine,
    carbon: RiPlantLine,
    water: RiWaterFlashLine,
    ergonomics: RiTShirt2Line,
    softToTouch: RiHandHeartLine,
    breathable: RiWindyLine,
    thoughtful: RiColorFilterLine,
    reinforced: RiStackLine,
    quality: RiScales2Line,
    material: RiShieldStarLine,
    warranty: RiPriceTag2Line,
    adaptive: RiRainbowLine,
    functional: RiShirtLine,
    timeless: RiInfinityLine,
    mixAndMatch: RiShapesLine,
  };

  const icon = (iconName: keyof typeof Icons, className: string) => {
    const IconComponent = Icons[iconName];
    return <IconComponent className={className} />;
  };

  return (
    <section className="mt-12">
      <div className="flex flex-col gap-10">
        <h1 className="text-3xl md:text-5xl">Discover timeless elegance</h1>
        <p className="">
          Step into a world where quality meets quintessential charm with our
          collection. Every thread weaves a promise of unparalleled quality,
          ensuring that each garment is not just a part of your wardrobe, but a
          piece of art. Here's the essence of what makes our apparel the
          hallmark for those with an eye for excellence and a heart for the
          environment.
        </p>
      </div>
      <ul className="flex border-b border-b-neutral-200 overflow-x-auto mt-12">
        {productSpecs.map((spec, index) => (
          <li
            key={spec.feature}
            className={`flex-0 p-4 ${
              currentTabIndex === index ? "border-b border-b-blue-500" : ""
            }`}
            onClick={() => setCurrentTabIndex(index)}
          >
            {spec.feature}
          </li>
        ))}
      </ul>
      <div className="mt-4 rounded-lg grid grid-cols-1 lg:grid-cols-[33%_67%] gap-10 items-center">
        <img
          className="my-10"
          alt=""
          srcSet={`${imgUrl("mobile")} 480w, ${imgUrl("tablet")} 768w, ${imgUrl(
            "desktop"
          )} 1200w`}
          sizes="(max-width: 480px) 480px, (max-width: 768px) 768px, 1200px"
        />
        <div className="flex flex-col">
          <h2 className="text-2xl">{tabContent.descriptionHeading}</h2>
          <p className="mt-2">{tabContent.description}</p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {tabContent.points.map((point) => (
              <li key={point.label} className="flex items-center gap-2">
                <div className="w-12 h-12 flex items-center justify-center shadow rounded-full">
                  {icon(
                    point.icon as keyof typeof Icons,
                    "text-indigo-700 w-8 h-8"
                  )}
                </div>
                {point.label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecifications;
