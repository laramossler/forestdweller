export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-forest text-warm-white mt-24 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <p className="font-serif text-xl mb-2">Forest Dweller</p>
          <p className="text-sage text-sm">
            Documenting restoration, craft, and seasonal observations from the Pacific Northwest
          </p>
          <p className="text-sage/70 text-sm mt-6">
            © {currentYear} Forest Dweller. Built to last.
          </p>
        </div>
      </div>
    </footer>
  );
}
