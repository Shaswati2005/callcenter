export default function Footer() {
    return (
      <footer className="bg-[#1a0f2c] text-gray-400 py-8 px-6 text-center">
        <div className="max-w-5xl mx-auto">
          <p>© {new Date().getFullYear()} Elite Support. All rights reserved.</p>
          <div className="mt-2 space-x-4 text-sm">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    );
  }
  