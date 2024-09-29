const CardComponent = ({
    key, image = '', title, subTitle
}) => {
    return (
        <div
          key={key}
          className="w-fit p-3 rounded-xl bg-[#353141] flex flex-col items-start gap-2 hover:cursor-pointer capitalize"
        >
            <div 
              className="bg-gray-500 w-48 h-56 rounded-lg" 
              style={{backgroundImage: `url('${image}')`}}
            ></div>
            <h3 className="text-lg font-semibold">
                {title}
            </h3>
            <p className="text-gray-500">
                {subTitle}
            </p>
        </div>
    )
}

export default CardComponent