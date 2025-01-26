import { ClimbingBoxLoader } from "react-spinners";

export default function Load() {
  return (
    <div className="flex h-dvh flex-col justify-center items-center">
      <ClimbingBoxLoader color="black" />
      <h1 className="text-xl">We construct for you...</h1>
    </div>
  );
}
