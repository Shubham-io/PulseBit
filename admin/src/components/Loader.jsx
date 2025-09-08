import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-slate-50/80 backdrop-blur-sm z-50 animate-fadeIn">
      <RotatingLines
        strokeColor="grey"
        strokeWidth="4"
        animationDuration="0.9s"
        width="80"
        visible={true}
      />
    </div>
  );
};

export default Loader;
