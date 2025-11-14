import "../styles/globals.css";

export const metadata = {
  title: "Next.js Clean Architecture Example"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <main className="max-w-4xl mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}