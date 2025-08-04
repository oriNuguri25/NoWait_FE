import { useCallback } from "react";

export const useResizeImage = () => {
  const resizeImage = useCallback(
    (file: File, targetWidth = 375, targetHeight = 246): Promise<File> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();

        reader.onload = (e) => {
          img.src = e.target?.result as string;
        };

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          const ctx = canvas.getContext("2d");
          if (!ctx) return reject("Canvas context error");

          const originalRatio = img.width / img.height;
          const targetRatio = targetWidth / targetHeight;

          let sx = 0,
            sy = 0,
            sWidth = img.width,
            sHeight = img.height;

          if (originalRatio > targetRatio) {
            sWidth = img.height * targetRatio;
            sx = (img.width - sWidth) / 2;
          } else {
            sHeight = img.width / targetRatio;
            sy = (img.height - sHeight) / 2;
          }

          ctx.drawImage(
            img,
            sx,
            sy,
            sWidth,
            sHeight,
            0,
            0,
            targetWidth,
            targetHeight
          );

          canvas.toBlob((blob) => {
            if (!blob) return reject("Blob 생성 실패");
            const resizedFile = new File([blob], file.name, {
              type: file.type,
              lastModified: Date.now(),
            });
            resolve(resizedFile);
          }, file.type);
        };

        reader.readAsDataURL(file);
      });
    },
    []
  );

  return { resizeImage };
};
