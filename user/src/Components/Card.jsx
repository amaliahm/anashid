const CardComponent = ({
    key, image = '', title, subTitle
}) => {
    return (
        <div
          key={key}
          className="w-40 sm:w-48 md:w-64 p-3 rounded-xl bg-[#353141] flex flex-col items-start gap-2 hover:cursor-pointer capitalize"
        >
            <div 
              className="bg-gray-500 w-full h-56 rounded-lg" 
              style={{backgroundImage: `url('${image}')`}}
            ></div>
            <h3 className="text-md sm:text-lg font-semibold">
                {title}
            </h3>
            <p className="text-gray-500 text-sm sm:text-base">
                {subTitle}
            </p>
        </div>
    )
}

export default CardComponent