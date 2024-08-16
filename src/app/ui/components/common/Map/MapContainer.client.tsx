"use client";

import { useMemo, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Map, {
  NavigationControl,
  FullscreenControl,
  Popup,
  Source,
  Layer,
} from "react-map-gl";
import type { MapRef } from "react-map-gl";

import { useAppSearchParams } from "~/context/SearchParamsContext";
import { IconGenerator } from "../IconGenerator";
import type {
  IListingData,
  TMapboxMarkerData,
} from "~/app/(application)/definitions";
import {
  clusterLayer,
  clusterCountLayer,
  unclusteredPointLayer,
} from "./layers";
import "mapbox-gl/dist/mapbox-gl.css";
import "./map.css";

const listingsToGeoJSON = (
  listings: IListingData[],
): GeoJSON.FeatureCollection<GeoJSON.Geometry> => ({
  type: "FeatureCollection",
  features: listings?.map((listing) => ({
    type: "Feature",
    properties: { ...listing },
    geometry: {
      type: "Point",
      coordinates: [listing.longitude, listing.latitude],
    },
  })),
});

export default function MapContent({
  singleListing = false,
  listings,
}: {
  singleListing?: boolean;
  listings: IListingData[];
}) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
  const [selectedMarker, setSelectedMarker] = useState<
    TMapboxMarkerData | undefined
  >();
  const mapRef = useRef<MapRef>(null);
  const geojson = useMemo(() => listingsToGeoJSON(listings), [listings]);
  const { searchParamsValues, searchParams } = useAppSearchParams();

  const startDate = searchParamsValues.fromDate?.format("MMM DD");
  const endDate = searchParamsValues.toDate?.format("MMM DD");

  const handleClick = useCallback(
    (event: mapboxgl.MapLayerMouseEvent) => {
      if (!mapRef.current) return;

      const features = mapRef.current.queryRenderedFeatures(event.point, {
        layers: ["clusters", "unclustered-point"],
      });
      //if we click nowhere,do nothing
      if (!features.length) return;

      const feature = features[0];
      // If we click on a cluster, zoom on it and return
      if (feature?.properties?.cluster) {
        const clusterId = feature.properties.cluster_id as number;
        const map = mapRef.current;

        const source = map.getSource("listings") as mapboxgl.GeoJSONSource;
        source.getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;
          if (feature.geometry.type === "Point") {
            map.flyTo({
              center: feature.geometry.coordinates as [number, number],
              zoom: zoom,
            });
          }
        });
      } else if (feature?.properties && feature.geometry.type === "Point") {
        //If we click on property, unmount the popup then populate the
        //selected marker (we are also ensuring that coordinates exist)

        if (selectedMarker !== undefined) {
          setSelectedMarker(undefined);
          return;
        }
        const property = feature.properties as IListingData;
        const coordinates = feature.geometry.coordinates as [number, number];
        setSelectedMarker({
          id: property.id,
          name: property.name,
          city: property.city,
          state: property.state,
          price: property.price,
          latitude: coordinates[1],
          longitude: coordinates[0],
          source: property.source,
        });
      }
    },
    [selectedMarker],
  );
  return (
    <main>
      <Map
        reuseMaps
        ref={mapRef}
        mapboxAccessToken={mapboxToken}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{
          height: singleListing ? "240px" : "100vh",
          borderRadius: singleListing ? "8px" : "0px",
        }}
        initialViewState={{
          latitude: listings[0]?.latitude ?? 35.78216,
          longitude: listings[0]?.longitude ?? -80.79345,
          zoom: 10,
        }}
        maxZoom={20}
        minZoom={3}
        interactiveLayerIds={[clusterLayer.id] as [string]}
        onLoad={() => {
          const map = mapRef.current;
          if (map && !map.hasImage("custom-marker")) {
            map.loadImage("/marker_icon.png", (error, image) => {
              if (error) {
                console.error("Error loading image:", error);
                return;
              }
              if (!image) {
                console.error("Image not found");
                return;
              }
              if (map.hasImage("custom-marker")) return;
              map.addImage("custom-marker", image);
            });
          }
        }}
        onClick={handleClick}
      >
        <Source
          id="listings"
          type="geojson"
          data={geojson}
          cluster={true}
          clusterMaxZoom={12}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
        <FullscreenControl
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "100px",
            alignItems: "center",
            backgroundColor: "white",
          }}
        />
        <NavigationControl showZoom={true} showCompass={false} />
        {!singleListing && selectedMarker ? (
          <Popup
            closeOnMove
            offset={25}
            latitude={selectedMarker.latitude}
            longitude={selectedMarker.longitude}
            onClose={() => setSelectedMarker(undefined)}
            closeButton={false}
          >
            <div className="flex flex-col justify-center gap-2">
              <p className="text-base font-medium leading-6">
                {selectedMarker.name}
              </p>
              <p className="text-sm font-medium leading-[14px] text-[#676D73]">{`${selectedMarker.city}, ${selectedMarker.state}`}</p>
              <div className="flex justify-between">
                <p className="text-sm  font-medium">
                  ${selectedMarker.price}
                  <span className="text-primary-grey400"> night</span>
                </p>
                <p className="text-sm font-medium text-primary-grey400">
                  {startDate} - {endDate}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <IconGenerator
                  src="/rating_star.svg"
                  alt="Rating star"
                  width="16px"
                  height={16}
                />
                <h1 className="text-sm font-bold text-primary">
                  4.5
                  <span className="text-sm font-medium text-primary-grey400">
                    {` (293 review)`}
                  </span>
                </h1>
              </div>
              <Link
                href={`listing/${selectedMarker.source}/${selectedMarker.id}?${searchParams.toString()}`}
                className="max-content"
              >
                <button className="w-full rounded-full border border-primary py-3 text-base font-bold text-primary hover:bg-primary hover:text-white">
                  Book
                </button>
              </Link>
            </div>
          </Popup>
        ) : null}
      </Map>
    </main>
  );
}
