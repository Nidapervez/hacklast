import { client } from "@/sanity/lib/client";


async function getData() {
  const fetchData = await client.fetch(
    `*[_type == "alert"] {
      title,
      description,
      imageUrl,
      alt,
      price
    }`
  );
  return fetchData;
}

export default async function Shop() {
  const data = await getData();

  return (
    <div className="flex flex-col items-center gap-8 p-5">
      {data.map((val: any, i: number) => (
        <div
          key={i}
          className="flex flex-col md:flex-row bg-white shadow-md p-5 rounded-lg w-full max-w-4xl"
        >
          {/* Image Section */}
          {val.imageUrl && (
            <div className="flex flex-col w-[85%] max-md:ml-0 max-md:w-full h-full">
              <img
                src={val.imageUrl}
                alt={val.alt || "Alert Image"}
                className="object-contain w-full h-full rounded-lg"
                loading="lazy"
              />
            </div>
          )}

          {/* Details Section */}
          <div className="flex flex-col gap-4 mt-4 md:mt-0 md:ml-5 w-full">
            {/* Title */}
            <h2 className="text-xl font-bold text-blue-900">{val.title}</h2>

            {/* Description */}
            <p className="self-stretch mt-3.5 text-lg leading-8 text-gray-400 max-md:max-w-full">{val.description}</p>

            {/* Price */}
            <div className="flex items-center gap-3">
              <span className="text-lg  text-blue-900">
                ${val.price}
              </span>
              <span className="text-sm text-pink-500">
                {/* Example Discount: */}
                {` 26$`}
              </span>
            </div>

            {/* Action Button */}
            <button
            className="mt-8 max-w-full w-[145px]"
            aria-label="Add to cart"
          >
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/48515e2413874846bf60cd2409ef14d1/3f7aedf877b358f5deb70a79fdce6a1dc4b00a71313071784251a5d4b838c40d?apiKey=48515e2413874846bf60cd2409ef14d1&"
              className="object-contain w-full aspect-[4.27]"
              alt="Add to cart button"
            />
          </button>
          </div>
        </div>
      ))}
      
    </div>
  );
}
