import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleImageClick = async (img: string, toast: any) => {
  const canvas = document.createElement("canvas")
  const context = canvas.getContext("2d")
  const image = new Image()
  image.src = img
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
  image.src = img
}
