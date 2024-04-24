import { createSlice } from "@reduxjs/toolkit";



function getPage ()  {
    const path = window.location.pathname
     
    if(path === '/'){
       return 1
    } else if (path === '/playlists'){
       return 2 
    } else if (path === '/favorites') {
       return 3 
    } else {
        return 0 
    }
    
    
  }

const page = createSlice({
    name:'page',
    initialState:{ 
        currentPage: getPage()
        

    },
    reducers:{
        changePage : (state,action)=>{
         state.currentPage = action.payload
        }
    }
})

export const {changePage}=page.actions

export default page.reducer