"use client"
import NextImage from "next/image"
import { useToast } from "@/components/ui/use-toast"

export default function IndexPage() {
  const { toast } = useToast()

  const handleImageClick = async () => {
    const canvas = document.createElement("canvas")
    const context = canvas.getContext("2d")
    const image = new Image()
    image.src = "/bigPants.png"
    image.onload = () => {
      canvas.width = image.width
      canvas.height = image.height
      context?.drawImage(image, 0, 0)
      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast({
            title: "Error",
            description: "Could not load image.",
            duration: 2000,
          })
          return
        }
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ [blob.type]: blob }),
          ])
          toast({
            title: "Copied to clipboard",
            description: "The image has been copied to your clipboard.",
            duration: 2000,
          })
        } catch (error) {
          toast({
            title: "Failed to copy",
            description: "Please manually copy the image.",
            duration: 2000,
          })
        }
      })
    }
    image.crossOrigin = "anonymous"
    image.src = "/bigPants.png"
  }

  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex items-center justify-center">
        <NextImage
          src="/bigPants.png"
          width={1000}
          height={1000}
          alt="the-culture"
          onClick={handleImageClick}
        />
      </div>
    </div>
  )
}
