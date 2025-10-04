import { LocaleToggler } from "../features/LocaleToggler";
import { ThemeToggler } from "../features/ThemeToggler";

export function Header() {
  return <header className="flex items-center">
    <LocaleToggler />
    <ThemeToggler />
  </header>;
}