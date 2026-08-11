import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "मुनि श्री 108 सुवन्द्य सागर जी महाराज | Jain Dharma, Pravachan & Swadhyay",
    template: "%s | मुनि श्री 108 सुवन्द्य सागर जी महाराज"
  },
  description: "परम पूज्य निर्ग्रन्थ मुनि श्री 108 सुवन्द्य सागर जी महाराज के पावन प्रवचन, ग्रन्थ, जैन धर्म शिक्षाएँ, चातुर्मास प्रवास, जीवन नीति एवं आध्यात्मिक मार्गदर्शन प्राप्त करें।",
  keywords: [
    "मुनि सुवन्द्य सागर",
    "Suvandya Sagar Ji Maharaj",
    "Muni Suvandyasagar",
    "Digambar Jain Muni",
    "Jain Pravachan",
    "Jivan Neeti",
    "Jain Dharma",
    "Swadhyay",
    "Salumbar Chaturmas",
    "Shravak Sanskar"
  ],
  authors: [{ name: "Rishabh Jain", url: "https://dev-rishabh.vercel.app/" }],
  creator: "Rishabh Jain",
  metadataBase: new URL("https://jain-ninad.vercel.app"),
  openGraph: {
    title: "मुनि श्री 108 सुवन्द्य सागर जी महाराज | Jain Dharma, Pravachan & Swadhyay",
    description: "परम पूज्य निर्ग्रन्थ मुनि श्री 108 सुवन्द्य सागर जी महाराज के पावन प्रवचन, ग्रन्थ, जैन धर्म शिक्षाएँ, चातुर्मास प्रवास एवं जीवन नीति।",
    url: "https://jain-ninad.vercel.app",
    siteName: "मुनि श्री 108 सुवन्द्य सागर जी महाराज",
    images: [
      {
        url: "/suvandya-sagar-ji.png",
        width: 800,
        height: 800,
        alt: "मुनि श्री 108 सुवन्द्य सागर जी महाराज",
      },
    ],
    locale: "hi_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "मुनि श्री 108 सुवन्द्य सागर जी महाराज | Jain Dharma & Pravachan",
    description: "परम पूज्य निर्ग्रन्थ मुनि श्री 108 सुवन्द्य सागर जी महाराज के पावन प्रवचन एवं आगमानुसारी चर्या।",
    images: ["/suvandya-sagar-ji.png"],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
