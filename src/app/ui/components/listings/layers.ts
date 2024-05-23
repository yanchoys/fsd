import type { LayerProps } from "react-map-gl";

//the white circle
export const clusterLayer: LayerProps = {
  id: "clusters",
  type: "circle",
  source: "listings",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": "#ffffff",
    //radius = 25 -> 5 properties, radius = 30 -> 10 properties and so on
    "circle-radius": ["step", ["get", "point_count"], 25, 5, 30, 10, 40],
  },
};
//the typography on top of the white circle
export const clusterCountLayer: LayerProps = {
  id: "cluster-count",
  type: "symbol",
  source: "listings",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 14,
  },
};
//the marker when there are no clusters
export const unclusteredPointLayer: LayerProps = {
  id: "unclustered-point",
  type: "symbol",
  source: "listings",
  filter: ["!", ["has", "point_count"]],
  layout: {
    "icon-image": "custom-marker",
    "icon-size": 1,
  },
};
