import Image from "next/image";

export default function Loader({ text = "" }) {
  return (
    <>
      <div className="absolute w-full h-[100vh] top-0 bg-[#414040] z-30 opacity-30"></div>
      <Image
        src="/gifs/loading.gif"
        alt=""
        width={75}
        height={190}
        className="absolute top-[45vh] left-[46vw] z-40"
      />
      <p className="absolute top-[54vh] left-[46vw] z-40">{text}</p>
    </>
  );
}
