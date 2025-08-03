export function getSizeRatio(width: number, height: number, targetWidth: number, targetHeight: number) {
    const widthRatio = Math.min(width, targetWidth) / targetWidth
    const heightRatio = Math.min(height, targetHeight) / targetHeight

    return Math.min(widthRatio, heightRatio) || 1
}