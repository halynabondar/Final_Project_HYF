const Footer = () => {
  return (
    <footer className="w-full bg-blue-100 py-4 text-gray-700">
      <div className="container mx-auto flex flex-col items-center justify-center gap-1 text-center sm:flex-row sm:gap-10 sm:text-left">
        <p className="text-sm font-semibold">
          &copy; {new Date().getUTCFullYear()} CodeCrafters Inc.
        </p>
        <p className="text-sm font-semibold">Privatlivspolitik</p>
        <p className="text-sm font-semibold">Copyright</p>
      </div>
    </footer>
  );
};

export default Footer;