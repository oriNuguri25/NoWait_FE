// pages/map/manage.tsx
import { useState } from "react";
import BoothMarker from "../../../assets/icon/BoothMarker.svg?react";
import { motion } from "framer-motion";

const MapManagePage = () => {
  const [tempMarkers, setTempMarkers] = useState<
    { storeId: number; top: string; left: string }[]
  >([]);
  const [markerId, setMarkerId] = useState(1000);

  const handleMapClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    //e.client 브라우저에서 좌표까지의 거리
    const x = e.clientX - rect.left; // = offsetX
    const y = e.clientY - rect.top;

    console.log(`"${markerId}": { top: "${x}%", left: "${y}%" },`);
    const width = rect.width;
    const height = rect.height;
    console.log(rect.left, rect.top,"aaaa", e.clientX);
    const left = ((x / width) * 100).toFixed(2);
    const top = ((y / height) * 100).toFixed(2);

    const newMarker = {
      storeId: markerId,
      top: `${top}%`,
      left: `${left}%`,
    };

    console.log(`"${markerId}": { top: "${top}%", left: "${left}%" },`);
    setTempMarkers((prev) => [...prev, newMarker]);
    setMarkerId((prev) => prev + 1);
  };

  return (
    <div
      className="mx-auto border border-gray-300"
      style={{
        width: "430px",
        height: "100dvh",
        overflow: "hidden",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <motion.div
        drag
        dragElastic={false}
        dragTransition={{
          power: 0,
          timeConstant: 0,
        }}
        dragConstraints={{
          left: -(1100 - 430),
          right: 0,
          top: -(1100 - 812),
          bottom: 0,
        }}
        style={{
          width: "1100px",
          height: "1100px",
          position: "relative",
          cursor: "grab",
        }}
        onClick={handleMapClick}
      >
        <img
          src="/test-map.png"
          className="w-[1100px] h-[1100px] overflow-auto"
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            pointerEvents: "none",
            userSelect: "none",
          }}
          alt="맵 생성"
        />
        {tempMarkers.map((marker) => (
          <div
            key={marker.storeId}
            className="absolute"
            style={{
              top: marker.top,
              left: marker.left,
              transform: "translate(-50%, -100%)",
            }}
          >
            <BoothMarker />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default MapManagePage;
