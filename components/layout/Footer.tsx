export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-border py-4 px-4 sm:px-8 mt-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
        <p className="text-gray-400 text-xs font-semibold italic sm:text-sm">
          © {new Date().getFullYear()} Forêt H.E — Forestry Operations Management
        </p>
        <nav aria-label="Footer links" className="flex flex-wrap gap-4">
          <a href="#" className="text-xs font-semibold italic sm:text-sm text-gray-400 hover:text-forest-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-xs font-semibold italic sm:text-sm text-gray-400 hover:text-forest-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-xs font-semibold italic sm:text-sm text-gray-400 hover:text-forest-primary transition-colors">
            Support
          </a>
        </nav>
      </div>
    </footer>
  );
}