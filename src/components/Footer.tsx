const Footer = () => {
  return (
    <footer className="mt-40">
      <div className="flex">
        <h2></h2>
        <p></p>
        <form action="" className="flex flex-col gap-4 w-full">
          <label htmlFor="email" className="sr-only" />
          <input
            type="text"
            id="email"
            placeholder="Enter your email"
            className="w-full border border-neutral-200 bg-neutral-200/50 p-2"
          />
          <button className="w-full bg-blue-500 text-white p-2">
            Subscribe
          </button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
