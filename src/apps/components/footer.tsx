import { getDayName } from "../../utils";

export default function Footer() {
  return (
    <footer className="footer-glass glass">
      <p>Rights reserved © {new Date().getFullYear()}.</p>
      <p>Have a good {getDayName(new Date().getDay())}!</p>
    </footer>
  );
}
