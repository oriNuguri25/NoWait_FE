import axios from "axios";
import { useEffect, useState } from "react";

let cachedPaths: { lat: number; lng: number }[][] | null = null;

export const useGeoPolygon = () => {
  const [paths, setPaths] = useState<{ lat: number; lng: number }[][]>([]);

  useEffect(() => {
    if (cachedPaths) {
      setPaths(cachedPaths);
      return;
    }

    const fetchPolygons = async () => {
      try {
        const { data } = await axios.get("/geojson/university.geojson");

        const coords = data.features.map((feature: any) =>
          feature.geometry.coordinates[0].map(
            ([lng, lat]: [number, number]) => ({ lat, lng })
          )
        );

        cachedPaths = coords;
        setPaths(coords);
      } catch (err) {
        console.error("GeoJSON에 오류가 발생 했습니다.:", err);
      }
    };

    fetchPolygons();
  }, []);

  return paths;
};