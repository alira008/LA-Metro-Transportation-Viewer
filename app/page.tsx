import getMetroRoutes, { Route, VehicleDescription } from "./api/agencyRoutes";
import getMetroVehicles, { Vehicle } from "./api/vehiclePositions";
import VehicleDisplayer from "./components/vehicleDisplayer";

function cacheVehicleDescriptions(
  routes: Array<Route>
): Map<string, VehicleDescription> {
  const stopIdMap = new Map<string, VehicleDescription>();
  for (let route of routes) {
    for (let direction of route.directions) {
      for (let stop of direction.stops) {
        const vehicleDescription: VehicleDescription = {
          title: direction.title,
          stopName: stop.name,
        };

        stopIdMap.set(stop.id, vehicleDescription);
      }
    }
  }

  return stopIdMap;
}

export default async function Home() {
  const vehicles: Vehicle[] = await getMetroVehicles();
  const routes = await getMetroRoutes();
  const stopIdMap = cacheVehicleDescriptions(routes);
  const sortVehicles = (a: Vehicle, b: Vehicle): number => {
    const vehicleDesc1 = getVehicleDescription(a.stopId);
    const vehicleDesc2 = getVehicleDescription(b.stopId);

    // if titles are the same sort by ascending
    if (vehicleDesc1.title === vehicleDesc2.title)
      return a.currentStopSequence - b.currentStopSequence;

    // sort by longest title length asc
    return vehicleDesc1.title.localeCompare(vehicleDesc2.title);
  };

  function getVehicleDescription(stopId: string): VehicleDescription {
    let result = stopIdMap.get(stopId);

    if (!result) {
      return {
        title: "Not Found",
        stopName: "Not Found",
      };
    }

    return result;
  }

  return (
    <main className="flex flex-col justify-between items-center min-h-screen bg-white">
      <h1 className="py-14 w-full text-4xl font-bold text-center bg-black">
        Metro G-Line Vehicles
      </h1>
      <div className="text-black">
        <ol className="grid grid-cols-4">
          {vehicles.sort(sortVehicles).map((vehicle) => (
            <li key={vehicle.vehicle.id} className="p-6">
              <VehicleDisplayer
                vehicle={vehicle}
                getVehicleDescription={getVehicleDescription}
              />
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
