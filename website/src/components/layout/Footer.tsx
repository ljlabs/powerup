import Logo from "../navigation/Logo";

interface Props {
  className?: string;
}

export default function Footer({ className = "" }: Props) {
  return (
    <footer
      className={`w-full flex flex-col md:flex-row justify-between items-center px-16 md:px-48 py-10 gap-6 bg-surface-container-high border-t-2 border-on-background mt-16 ${className}`}
    >
      <div className="flex items-center gap-2">
        <Logo size="md" />
      </div>
      <p className="text-body-md text-secondary">
        &copy; 2024 Claude Skills Storefront. Built for Creators.
      </p>
      <div className="flex gap-10">
        <a
          className="text-secondary hover:text-primary transition-colors"
          href="#"
        >
          GitHub
        </a>
        <a
          className="text-secondary hover:text-primary transition-colors"
          href="#"
        >
          Documentation
        </a>
        <a
          className="text-secondary hover:text-primary transition-colors"
          href="#"
        >
          Discord
        </a>
      </div>
    </footer>
  );
}
