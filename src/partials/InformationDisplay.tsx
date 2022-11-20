const InfoDisplay = (props: {
  id: string;
  message: string;
  iconClasses: string;
  hidden: boolean;
  zIndex?: number;
}) => {
  return (
    <div
      className="flex h-12 w-full items-center justify-center"
      id={props.id}
      hidden={props.hidden}
      style={props.zIndex ? { zIndex: props.zIndex } : undefined}
    >
      <div className="flex flex-col items-center text-center opacity-70">
        <div className="h-6">
          <i className={`${props.iconClasses} fa-xl`}></i>
        </div>
        <small className="mt-2">{props.message}</small>
      </div>
    </div>
  );
};

export { InfoDisplay };

// fa-solid fa-circle-notch animate-spin
// Cargando imagenes...
// js--gallery-loader
