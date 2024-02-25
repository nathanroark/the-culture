"use client"
import NextImage from "next/image"
import { useToast } from "@/components/ui/use-toast"

export default function IndexPage() {
  const { toast } = useToast()

  const handleImageClick = async () => {
    const imageSrc = "/bigPants.png"

    // Fallback for iOS and other browsers that don't support clipboard.write with images
    const copyImageFallback = (src: string) => {
      const imgElement = document.createElement("img")
      imgElement.src = src
      const range = document.createRange()
      range.selectNode(imgElement)
      window.getSelection()?.removeAllRanges() // Clear previous selections
      window.getSelection()?.addRange(range) // Select the image element

      try {
        // Attempt to use the execCommand for older browsers
        const successful = document.execCommand("copy")
        if (successful) {
          toast({
            title: "Copied to clipboard",
            description: "Big Pants",
            duration: 2000,
          })
        } else {
          throw new Error("Failed to copy")
        }
      } catch (err) {
        toast({
          title: "Failed to copy to clipboard",
          description: err instanceof Error ? err.message : "An error occurred",
          duration: 2000,
        })
      } finally {
        // Cleanup after attempt
        window.getSelection()?.removeAllRanges()
      }
    }

    const image = new Image()
    image.src = imageSrc
    image.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = image.width
      canvas.height = image.height
      const context = canvas.getContext("2d")
      context?.drawImage(image, 0, 0)
      canvas.toBlob(async (blob) => {
        if (!blob) return

        try {
          // Feature detection for Clipboard API
          if (navigator.clipboard && navigator.clipboard.write) {
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
          } else {
            // Fallback for browsers without clipboard.write support
            copyImageFallback(imageSrc)
          }
        } catch (e) {
          const error = e as Error
          toast({
            title: "Failed to copy to clipboard",
            description: error.message,
            duration: 2000,
          })
        }
      })
    }
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
