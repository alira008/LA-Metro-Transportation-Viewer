type Trip = {
  tripId: string;
  routeId: string;
  startDate: string;
  scheduleRelationship: string;
};

type Position = {
  latitude: number;
  longitude: number;
  bearing: number;
  speed: number;
};

type VehicleInfo = {
  id: string;
  label: string;
};

type Vehicle = {
  trip?: Trip;
  vehicle: VehicleInfo;
  position: Position;
  currentStopSequence: number;
  stopId: string;
  currentStatus: string;
  timestamp: string;
};

type Entity = {
  id: string;
  vehicle: Vehicle;
};

async function getMetroVehicles(): Promise<Vehicle[]> {
  const headers = new Headers();
  const apiKey = process.env.METRO_API_KEY;
  if (!apiKey) {
    console.error("No api key found");
    return [];
  }

  headers.set("Authorization", apiKey);
  headers.set("Content-Type", "application/json");

  const agencyKey = "lametro";
  const metroUrl = `https://api.goswift.ly/real-time/${agencyKey}/gtfs-rt-vehicle-positions?format=json`;

  const res = await fetch(metroUrl, {
    headers: headers,
  });
  const data = await res.json();
  const entities: Entity[] = data["entity"];
  let numGLineVehicles = 0;
  let gLineVehicles: Vehicle[] = [];
  for (let entity of entities) {
    const vehicle = entity.vehicle;
    if (vehicle.trip === undefined) continue;
    if (!vehicle.trip.routeId.includes("901")) continue;

    // console.log(vehicle.trip.routeId);
    gLineVehicles.push(vehicle);
    numGLineVehicles += 1;
  }

  return gLineVehicles;
}

export default getMetroVehicles;
export type { Entity, Vehicle };
