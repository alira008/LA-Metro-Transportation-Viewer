type Stop = {
  id: string;
  lat: number;
  lon: number;
  minor: boolean;
  name: string;
  code: number;
};

type Direction = {
  id: string;
  title: string;
  stops: Array<Stop>;
  headsigns: Array<string>;
};

type Location = {
  lat: number;
  lon: number;
};

type Shape = {
  tripPatternId: string;
  shapeId: string;
  directionId: string;
  headsign: string;
  locs: Array<Location>;
};

type Extent = {
  minLat: number;
  minLon: number;
  maxLat: number;
  maxLon: number;
};

type Route = {
  id: string;
  name: string;
  shortName: string;
  longName: string;
  type: string;
  directions: Array<Direction>;
  shapes: Array<Shape>;
  extent: Extent;
};

type Data = {
  agencyKey: string;
  routes?: Array<Route>;
};

type VehicleDescription = {
  title: string;
  stopName: string;
};

async function getMetroRoutes(): Promise<Array<Route>> {
  const headers = new Headers();
  const apiKey = process.env.METRO_API_KEY;
  if (!apiKey) {
    console.error("No api key found");
    return [];
  }

  headers.set("Authorization", apiKey);
  headers.set("Content-Type", "application/json");

  const agencyKey = "lametro";
  const metroUrl = `https://api.goswift.ly/info/${agencyKey}/routes?route=${encodeURIComponent(
    "901-13168"
  )}&verbose=true`;

  try {
    const res = await fetch(metroUrl, {
      headers,
    });

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status} ${res.statusText}`);
      return [];
    }

    const jsonResponse = await res.json();
    const data: Data = jsonResponse.data;

    if (!data || !data.routes) return [];
    return data.routes;
  } catch (e) {
    console.error(e);
  }

  return [];
}

export default getMetroRoutes;
export type { Route, Stop, VehicleDescription };
