import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// COMPONENTS
import SideBarComponent from "../../components/SideBar"
import NavBarComponent from "../../components/NavBar"
import Modal from "../../components/Modal.jsx"
import ModalAdd from "../../components/ModalAdd.jsx"

// SETTINGS COMPONENTS
import Publicities from "../../components/settingCompo/Publicities.jsx"
import Gender from "../../components/settingCompo/Gender.jsx"
import Theme from "../../components/settingCompo/Theme.jsx"
import Language from "../../components/settingCompo/Language.jsx"
import SendEmail from "../../components/settingCompo/SendEmail.jsx"

// ICONS
import { bg } from "../../assets/images"
import {  add_icon } from "../../assets/icons"

// CONTEXT
import { useAdminContext } from "../../hooks/adminContext.jsx"

// REDUX
import { fetchTableData, addItemToTable, deleteItemFromTable} from "../../services/settingsService.js"

const Settings = () => {
    const { id } = useAdminContext()
    const dispatch = useDispatch()
    const tables = useSelector((state) => state.settings)
    const [modal, setModal] = useState(false)
    const [selected, setSelected] = useState(null)
    const [value, setValue] = useState('')
    const [add, setAdd] = useState(false)
    const [table, setTable] = useState('')

    const openModal = (elem) => {
        setSelected(elem)
        setModal(true)
    }

    const closeModal = () => {
        setSelected('')
        setModal(false)
    }

    useEffect(() => {
        dispatch(fetchTableData('publicity'));
        dispatch(fetchTableData('gender'));
        dispatch(fetchTableData('theme'));
        dispatch(fetchTableData('language'));
    }, [])

    const handleAdd = (table, item) => {
        dispatch(addItemToTable(table, item));
        closeModal()
    }

    const handleDelete = async (table, id) => {
        dispatch(deleteItemFromTable(table, id))
        setTimeout(() => {
            dispatch(fetchTableData(table));
        }, 1000)
        closeModal()
    }

    const elements = [
        {
            name: 'publicities',
            component:  <Publicities 
                          add_icon={add_icon}
                          data={tables.tables.publicity}
                          handleAdd={handleAdd}
                          openModal={openModal}
                          setAdd={setAdd}
                          setTable={setTable}
                        />
        },
        {
            name: 'gender',
            component:  <Gender 
                          add_icon={add_icon}
                          data={tables.tables.gender}
                          openModal={openModal}
                          setAdd={setAdd}
                          setTable={setTable}
                        />
        },
        {
            name: 'theme',
            component:  <Theme 
                          add_icon={add_icon}
                          data={tables.tables.theme}
                          openModal={openModal}
                          setAdd={setAdd}
                          setTable={setTable}
                        />
        },
        {
            name: 'language',
            component:  <Language 
                          add_icon={add_icon}
                          data={tables.tables.language}
                          openModal={openModal}
                          setAdd={setAdd}
                          setTable={setTable}
                        />
        },
        {
            name: 'send email',
            component:  <SendEmail 
                          handleAdd={handleAdd}
                          data={tables.tables.sendEmail}
                        />
        },
    ]

    return (
        <>
            <div className="flex">
                <SideBarComponent ele={-1} />
                <div className="flex-1">
                    <NavBarComponent id={id} />
                    <div className="ml-24 p-0">
                        <div 
                          className="p-10 lg:pl-12 pt-10 w-full h-11/12 h-2/6 bg-cover bg-center"
                          style={{ backgroundImage: `url('${bg}')`}}
                        >
                            <div className="lg:px-24 w-full p-8 profile-div flex flex-col flex-wrap justify-center space-y-10 items-center border-[1px] border-[#AFAFAF]">
                                {elements.map((elem, index)=>(
                                    <div 
                                      className="text-xl lg:text-3xl capitalize font-semibold w-11/12 py-8 flex flex-col justify-center items-start"
                                      key={index}
                                    >
                                        <div className="pl-2 mb-6 flex justify-between items-center">
                                          {elem.name}
                                        </div>
                                        <div className="w-full">
                                          {elem.component}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {add && table !== 'publicity' && 
              <ModalAdd 
                table={table} 
                value={value} 
                setValue={setValue} 
                loading={tables.tables[table].loading} 
                error={tables.tables[table].error} 
                handleAdd={() => {
                  handleAdd(table, value)
                  setTimeout(() => {
                    setAdd(false)
                  })
                }} 
                isOpen={add} 
                onClose={() => setAdd(false)} 
              />
            }
            {modal && 
              <Modal 
                title='Delete' 
                isOpen={modal} 
                onClose={closeModal} 
                id={selected.id} 
                name={table === 'publicity' ? 'this publicity' : selected.value} 
                handleDelete={() => handleDelete(table, selected.id)} 
                loading={tables.tables[table].loading} 
                error={tables.tables[table].error} 
              />
            }
        </>
    )
}

export default Settings