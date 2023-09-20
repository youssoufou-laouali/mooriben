export default function Example({
  images,
}: {
  images: {
    id: string;
    name: string;
    image: string;
  }[];
}) {
  return (
    <div className="flex -space-x-1 overflow-hidden">
      {images?.map((el) => (
        <>
          <img
            className="inline-block w-6 h-6 rounded-full ring-2 ring-white"
            src={el?.image}
            alt=""
          />
        </>
      ))}
    </div>
  );
}
