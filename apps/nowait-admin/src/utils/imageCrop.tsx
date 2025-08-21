import heic2any from "heic2any";
export async function cropCenterToSize(
  file: File,
  targetW = 375,
  targetH = 246,
  mime = "image/jpeg",
  quality = 0.9
): Promise<File> {
  let convertedFile = file;

  // HEIC 필터링 및 변환
  if (file.type === "image/heic" || file.name.toLowerCase().endsWith(".heic")) {
    try {
      const blob = await heic2any({
        blob: file,
        toType: "image/jpeg",
        quality,
      });

      // Blob을 File로 변환
      convertedFile = new File(
        [blob as BlobPart],
        file.name.replace(/\.heic$/i, ".jpg"),
        {
          type: "image/jpeg",
          lastModified: Date.now(),
        }
      );
    } catch (e) {
      console.error("HEIC 변환 실패:", e);
      throw new Error("HEIC 이미지를 변환하는 데 실패했습니다.");
    }
  }
  const img = await fileToImage(convertedFile);

  const srcW = img.naturalWidth || img.width;
  const srcH = img.naturalHeight || img.height;
  const srcAR = srcW / srcH;
  const dstAR = targetW / targetH;

  // 소스에서 잘라올 영역 계산(센터-크롭)
  let sx = 0,
    sy = 0,
    sW = srcW,
    sH = srcH;
  if (srcAR > dstAR) {
    // 소스가 더 가로로 넓음 -> 가로를 잘라냄
    sH = srcH;
    sW = sH * dstAR;
    sx = (srcW - sW) / 2;
  } else {
    // 소스가 더 세로로 큼 -> 세로를 잘라냄
    sW = srcW;
    sH = sW / dstAR;
    sy = (srcH - sH) / 2;
  }

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, sx, sy, sW, sH, 0, 0, targetW, targetH);

  const blob: Blob = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b as Blob), mime, quality)
  );

  // 확장자 정리
  const ext = mime === "image/png" ? "png" : "jpg";
  const safeName = file.name.replace(/\.[^/.]+$/, "");
  return new File([blob], `${safeName}_375x246.${ext}`, {
    type: mime,
    lastModified: Date.now(),
  });
}

function fileToImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}
