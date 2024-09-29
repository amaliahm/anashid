import React from "react"

//ICONS
import { favorite_icon } from "../../assets/icons";

const IconPlaceholder = () => (
    <div className="w-5 h-5 bg-gray-400 rounded-sm mr-3" />
  );

const TrendingAnasheedComponent = () => {
    return (
        <>
            <div className="mb-64">
        <div className="flex justify-between items-center">
        <h2 className="text-xl lg:text-2xl font-semibold mb-6 capitalize">
        trending  
        <span className='text-[var(--mainColor)]'> anasheed </span>
      </h2>
      
            <span className="flex space-x-4 text-gray-400 text-sm">Relase Date</span>
            <span className="flex space-x-4 text-gray-400 text-sm">Genre</span>
            <span className="flex space-x-4 text-gray-400 text-sm">Time</span>
          <div className="w-10">
          </div>
        </div>
        
        <table className="w-full text-white capitalize font-semibold">
          <tbody>
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="border-b border-gray-700 hover:cursor-pointer">
                <td className="py-2 font-bold">#{i}</td>
                <td className="py-2 flex rounded-xl items-center">
                  <div className="bg-green-500 w-16 h-16 rounded-xl mr-2 overflow-hidden">
                  </div>
                  <div className="">
                    <p>Nasheed</p>
                    <p className="text-gray-400 text-sm">artist</p>
                  </div>
                </td>
                <td className="py-2">Sep 18, 2024</td>
                <td className="py-2 text-gray-400">Madih</td>
                <td className="py-2 text-gray-400">15:10</td>
                
                <td className="py-2"><img src={favorite_icon} alt="favorite" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
        </>
    )
}

export default TrendingAnasheedComponent