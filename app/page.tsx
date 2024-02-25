"use client"
import NextImage from "next/image"
import { useToast } from "@/components/ui/use-toast"

export default function IndexPage() {
  const { toast } = useToast()
  return (
    <div className="flex min-h-screen justify-center">
      <div className="flex items-center justify-center">
        <NextImage
          src="/bigPants.png"
          width={1000}
          height={1000}
          alt="the-culture"
          onClick={async () => {
            const image = new Image()
            image.src = "/bigPants.png"
            image.onload = () => {
              const canvas = document.createElement("canvas")
              canvas.width = image.width
              canvas.height = image.height
              const context = canvas.getContext("2d")
              context?.drawImage(image, 0, 0)
              canvas.toBlob((blob) => {
                if (!blob) return
                try {
                await navigator.clipboard.write([
                  new ClipboardItem({
                    [blob.type]: blob,
                  }),
                ])
                toast({
                title: "Copied to clipboard",
                description: "Big Pants",
                duration: 2000,
                })
                } catch(e){ 
                toast({
                title: "Failed to copy to clipboard",
                description: e.message,
                duration: 2000,
                })
                }
              })
              
            }
          }}
        ></NextImage>
      </div>
    </div>
  )
}
