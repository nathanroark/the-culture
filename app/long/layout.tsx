import { Metadata } from "next"

interface RootLayoutProps {
  children: React.ReactNode
}

const ogImage = "https://theculture.lol/bigPantsLong.webp"

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    images: [
      {
        url: ogImage,
        // width: 1200,
        // height: 630,
        height: 1000,
        width: 1200,
        alt: "The Culture the long way",
      },
    ],
  },
  twitter: {
    images: [ogImage],
  },
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <div>{children}</div>
    </>
  )
}
