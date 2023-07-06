import { Vehicle } from "../api/vehiclePositions";
import { VehicleDescription } from "../api/agencyRoutes";

interface Props {
  vehicle: Vehicle;
  getVehicleDescription: (stopId: string) => VehicleDescription;
}

export default async function VehicleDisplayer({
  vehicle,
  getVehicleDescription,
}: Props) {
  const vehicleDescription = getVehicleDescription(vehicle.stopId);

  return (
    <div className="overflow-hidden py-8 px-4 max-w-sm bg-gray-50 rounded shadow-lg">
      <div className="pb-6 text-lg font-bold text-center">
        {vehicleDescription.title}
      </div>
      <div className="flex flex-col items-center">
        {vehicle.currentStatus === "STOPPED_AT" ? (
          <div>Stopped at {vehicleDescription.stopName}</div>
        ) : vehicle.currentStatus === "INCOMING_AT" ? (
          <div>Arriving at {vehicleDescription.stopName}</div>
        ) : (
          <div>Arriving at {vehicleDescription.stopName}</div>
        )}
        <div>Speed: {Math.round(vehicle.position.speed)} mph</div>
        <div className="text-gray-400">
          Last update :{" "}
          {new Date(parseInt(vehicle.timestamp) * 1000).toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
}
