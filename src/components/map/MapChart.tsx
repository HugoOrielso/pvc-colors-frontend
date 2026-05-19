"use client";

import {
  ComposableMap,
  Geographies,
  Geography,
  Annotation,
} from "react-simple-maps";

export default function MapChart() {
  return (
    <section className="flex h-full  w-full items-center justify-center  p-6">
      <ComposableMap
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [1.0, 1.0, -5],
          center: [-72.50782, 7.89391],
          scale: 1100,
        }}
        className="h-full w-full"
      >
        <Geographies
          geography="/features.json"
          fill="#d6d6da"
          stroke="#ffffff"
          strokeWidth={0.5}
        >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                className="outline-none transition hover:fill-[#63c7ff]"
              />
            ))
          }
        </Geographies>

        <Annotation
          subject={[-73, 8]}
          dx={-170}
          dy={-30}
          connectorProps={{
            stroke: "#ffcc00",
            strokeWidth: 4,
            strokeLinecap: "round",
          }}
        >
          <text
            x="-10"
            textAnchor="end"
            alignmentBaseline="middle"
            fill="#061540"
            fontSize={18}
            fontWeight={900}
          >
            Cúcuta
          </text>
        </Annotation>
      </ComposableMap>
    </section>
  );
}