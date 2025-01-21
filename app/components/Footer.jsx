const Footer = () => {
  return (
    <footer className="w-full bg-blue-100 py-7">
      <div className="container mx-auto flex items-center justify-center gap-10">
        <p className="text-sm">
          &copy; {new Date().getUTCFullYear()} CodeCrafters Inc.
        </p>
        <p className="text-sm">Privatlivspolitik</p>
        <p className="text-sm">Copyright</p>
      </div>
    </footer>
  );
};

export default Footer;
