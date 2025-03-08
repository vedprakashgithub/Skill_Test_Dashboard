import Image from "next/image";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Left Side: Logo */}
      <div className="flex items-center cursor-pointer space-x-2">
        <Image src="/logo.jpg" alt="Logo" width={120} height={40} priority />
      </div>

      {/* Right Side: Profile */}
      <div className="flex items-center cursor-pointer space-x-3">
        <Image
          src="/123.jpg" // Replace with actual profile image
          alt="Profile"
          width={30}
          height={30}
          className="rounded-full"
        />
        <span className="text-sm font-medium">Rahil Siddique</span>
      </div>
    </header>
  );
};

export default Header;
