import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Dispatch, SetStateAction } from 'react'
import { selectcategorytype } from './page'


type PropsType = {
    data: string[],
    filter: {
        value: selectcategorytype
        setValue: Dispatch<SetStateAction<PropsType['filter']['value']>>
    }
}




const FilterMenu:React.FC<PropsType> = ({data, filter}) => {








  return (
    <Menu as="div" className="relative inline-block text-left select-none" >
      <div>
        <MenuButton className="inline-flex w-44 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          {filter.value?filter.value:'Все'}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
        <MenuItem>
             <a
               onClick={()=>filter.setValue(null)}
               className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
             >
               Все
             </a>
           </MenuItem>
        {data.map((i)=>(
             <MenuItem key={i}>
             <a
               onClick={()=>filter.setValue(i)}
               className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
             >
               {i}
             </a>
           </MenuItem>
        ))}
       
        

          


        </div>
      </MenuItems>
    </Menu>
  )
}


export default FilterMenu