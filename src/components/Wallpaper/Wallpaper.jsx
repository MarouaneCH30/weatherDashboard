import wallpaper from "../../assets/img/wallpaper.jpg";

export const Wallpaper = () => {
  return (
    <>
      <div className="fixed inset-0 flex z-[-1] bg-black">
        <img
          className="w-full m-0 opacity-40 blur-sm"
          src={wallpaper}
          alt="Wallpaper"
        />
      </div>
    </>
  );
};
