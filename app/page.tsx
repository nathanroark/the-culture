"use client"
import NextImage from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { handleImageClick } from "@/lib/utils"

const img = "/bigPants.png"

export default function IndexPage() {
  const { toast } = useToast()

  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex items-center justify-center">
        <NextImage
          src={img}
          width={1000}
          height={1000}
          alt="the-culture"
          onClick={() => handleImageClick(img, toast)}
        />
      </div>
    </div>
  )
}
