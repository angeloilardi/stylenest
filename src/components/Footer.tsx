import categories from "./../data/categories.json";
import collections from "./../data/collections.json";
import {
  RiInstagramLine,
  RiFacebookBoxLine,
  RiTwitterXFill,
  RiGithubLine,
  RiYoutubeLine,
} from "react-icons/ri";
import Button from "./ui/Button";

const Footer = () => {
  return (
    <>
      <footer className="mt-20">
        <div className="border-b border-neutral-200">
          <div className="flex flex-col lg:flex-row md:justify-between lg:items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4">
                Join our newsletter
              </h3>
              <p className="mb-8">
                We'll send you a nice letter once per week. No spam.
              </p>
            </div>
            <form
              action=""
              className="flex flex-col gap-4 w-full mb-10 md:flex-row md:h-12 lg:w-120 md:items-center md:mb-0"
            >
              <label htmlFor="email" className="sr-only" />
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
                className="w-full border border-neutral-200 bg-neutral-200/50 p-2 rounded-md"
              />
              <Button className="bg-blue-500 text-white p-2 md:w-36">
                Subscribe
              </Button>
            </form>
          </div>
          <div className="lg:flex lg:flex-row lg:gap-52 md:mt-12">
            <div>
              <a href="/">
                <img src="/logo.svg" alt="" className="mr-4" />
              </a>
              <p className="my-8">
                Craft stunning style journeys that weave more joy into every
                thread.
              </p>
            </div>
            <div className="flex flex-col md:flex-row md:gap-36">
              <div className="flex flex-col gap-2 mb-6">
                <span className="mb-4 text-neutral-400"> SHOP CATEGORIES</span>
                <ul className="flex flex-col gap-2">
                  {categories.map((category) => {
                    return (
                      <li>
                        <a href={`/category/${category.category_id}`}>
                          {category.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="flex flex-col gap-2 mb-6">
                <span className="mb-4 text-neutral-400"> SHOP COLLECTIONS</span>
                <ul className="flex flex-col gap-2">
                  {collections.map((collection) => {
                    return (
                      <li>
                        <a href={`/collection/${collection.collection_id}`}>
                          {collection.name}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <p className="py-10">© 2024 StyleNest, Inc. All rights reserved.</p>
        <div className="flex gap-4">
          <RiInstagramLine size={24} />
          <RiFacebookBoxLine size={24} />
          <RiTwitterXFill size={24} />
          <RiGithubLine size={24} />
          <RiYoutubeLine size={24} />
        </div>
      </footer>
    </>
  );
};

export default Footer;
