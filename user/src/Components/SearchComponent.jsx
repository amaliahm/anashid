import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// REDUX
import { fetchFilterData, searchForNasheed, filterForNasheed } from "../services/searchService";
import { setItemNasheed } from "../slices/itemNasheedSlice";
import { addListening } from "../services/playedNowService";

//ICONS
import { search_icon } from "../assets/icons";
import { Filter, X } from "lucide-react";

// COMPONENTS
import Loading from "../pages/Loading";
import CardComponent from "./Card";

// CONTEXT
import { useUserContext } from "../hooks/userContext";

const FilterOption = ({ label, options, selected, onSelect }) => {
    return (
    <div className="my-4">
    <h4 className="text-sm font-semibold mb-2">{label}</h4>
    <div className="flex gap-2 overflow-x-auto pb-2">
      {Object.keys(options).map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(options[option])}
          className={`px-4 py-2 rounded-full whitespace-nowrap ${
            selected === options[option].id
              ? 'bg-black text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {options[option].value}
        </button>
      ))}
    </div>
  </div>
)}

const NasheedSearch = () => {
    const tables = useSelector((state) => state.search)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loggedinUser } = useUserContext()
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({
        theme: null,
        gender: null,
        language: null,
    })

  return (
    <>
      <div className="relative">
        <div className="flex justify-between items-center bg-[#1F1F1F] items-center h-fit w-96 rounded-full px-3">
            <button 
              disabled={!searchQuery} 
              className={` ${searchQuery ? 'hover:cursor-pointer' : 'hover:cursor-not-allowed'} `} 
              onClick={() => {
                setIsSearchOpen(true);
                dispatch(searchForNasheed(searchQuery))
              }}
            >
              <img 
                src={search_icon} 
                alt='search' 
              />
            </button>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for Anasheed" 
            className="w-full text-white rounded-full p-3 bg-transparent"
          />
        </div>
      </div>
      {isSearchOpen && (
        <div className="fixed inset-0 bg-white bg-opacity-50 backdrop-blur-sm transition-opacity duration-300 z-50  overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-[var(--backgroundColor)] text-white rounded-3xl w-full max-w-4xl p-6 relative">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Search For '{searchQuery}': </h2>
                <div>
                  <button
                    onClick={() => {
                        setIsFilterOpen(!isFilterOpen)
                        dispatch(fetchFilterData('gender'))
                        dispatch(fetchFilterData('theme'))
                        dispatch(fetchFilterData('language'))
                    }}
                    className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full"
                  >
                    <Filter className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setIsSearchOpen(false)
                      setSearchQuery('')
                    }}
                    className="p-2 hover:bg-white hover:bg-opacity-50 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {isFilterOpen && (
                <div className="mb-6 border-b border-gray-700 pb-6">
                  <FilterOption
                    label="Gender"
                    options={tables.tables.gender.data}
                    selected={filters.gender}
                    onSelect={(gender) => setFilters({ ...filters, gender: gender.id })}
                  />
                  <FilterOption
                    label="theme"
                    options={tables.tables.theme.data}
                    selected={filters.theme}
                    onSelect={(theme) => setFilters({ ...filters, theme: theme.id })}
                  />
                  <FilterOption
                    label="Language"
                    options={tables.tables.language.data}
                    selected={filters.language}
                    onSelect={(language) => setFilters({ ...filters, language: language.id })}
                  />
                  <button
                    onClick={() => {
                      dispatch(filterForNasheed({gender: filters.gender, theme: filters.theme, language: filters.language}))
                    }}
                    disabled={!filters.gender && !filters.theme && !filters.language}
                    className={`capitalize w-full my-2 bg-white bg-opacity-50 text-[var(--backgroundColor)] py-2 rounded-lg transition-colors ${!filters.gender && !filters.theme && !filters.language ? 'cursor-not-allowed' : 'hover:bg-opacity-100'}`}
                  >
                    apply filters
                  </button>
                </div>
              )}
              {tables.tables.result.success ? 
                <div className="overflow-x-auto">
                  <div className="flex gap-4 pb-4">
                    {tables.tables.result.data.map((card, index) => (
                      <div 
                        key={index} 
                        className="mt-4"
                        onClick={() => {
                          dispatch(setItemNasheed({ id: card.id, title: card.title, artist: card.artist_name, image: card.file_path }))
                          dispatch( addListening(
                            { id_user: loggedinUser, id_anasheed: card.id, position:0 }
                          ));
                          navigate(`/user/playednow/${loggedinUser}`)
                        }}
                      >
                        <CardComponent 
                          image={card.file_path}
                          title={card.title} 
                          subTitle={card.artist_name}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              : tables.tables.result.loading ? <Loading /> : tables.tables.result.error && <Loading title='No Nasheed Found' />}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NasheedSearch;