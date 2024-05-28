import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BMW PR Media",
  description: "BMW PR Media",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <head>
  
        {/* CDN Resources for USE*/}
        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css?ver=5.3.2" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.7.1/css/bootstrap-datepicker.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.carousel.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.3.4/assets/owl.theme.default.min.css" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.2.3/animate.min.css" />
        <link href="https://kit-pro.fontawesome.com/releases/v5.11.2/css/pro.min.css?ver=5.3.2" rel="stylesheet" type="text/css" />

      </head>

      <body className={inter.className}>{children}</body>
    </html>
  );
}
