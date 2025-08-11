export function preloadImages(imageUrls: string[], onProgress?: (loadedCount: number, totalCount: number) => void): Promise<void> {
  const uniqueUrls = Array.from(
    new Set(
      imageUrls
        .filter(Boolean)
        .map((url) => {
          // Normalize to absolute from site root
          if (url.startsWith('data:')) return url
          if (url.startsWith('http://') || url.startsWith('https://')) return url
          return url.startsWith('/') ? url : `/${url}`
        }),
    ),
  )

  const totalCount = uniqueUrls.length
  if (totalCount === 0) return Promise.resolve()

  let loadedCount = 0

  return new Promise((resolve) => {
    const handleOne = () => {
      loadedCount += 1
      if (typeof onProgress === 'function') onProgress(loadedCount, totalCount)
      if (loadedCount >= totalCount) resolve()
    }

    uniqueUrls.forEach((src) => {
      const img = new Image()
      img.onload = handleOne
      img.onerror = handleOne // Treat errors as done so we don't block forever
      img.src = src
    })
  })
}

