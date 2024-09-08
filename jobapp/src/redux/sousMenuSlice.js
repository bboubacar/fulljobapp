import { createSlice } from '@reduxjs/toolkit';
import { connexionSousmenu, menuPaths, profileSousmenu, userToken } from '../utilities/constantes';
import { jwtDecode } from 'jwt-decode';
import { tables } from '../utilities/db_infos';
import { changeSousMenuPath } from '../utilities/functions';

const sousMenuSlice = createSlice({
  name: 'sousMenu',
  initialState: {title:connexionSousmenu?.title, content: connexionSousmenu?.content},
  reducers: {
    changeSousMenu:  (state) => {
      let token = localStorage.getItem(userToken);
      
      if(!token){
        state.title=connexionSousmenu?.title; 
        state.content=connexionSousmenu?.content;
        return;
      }

      token = jwtDecode(token);
      
      let newState = profileSousmenu;
      let content = []
      newState?.content?.map(data=>{
        if(token?.role===tables.candidats){
          data = changeSousMenuPath(data, menuPaths.candidat, menuPaths.connexionCandidat);
        } 
        if(token?.role===tables.representants){
          data = changeSousMenuPath(data, menuPaths.recruteur, menuPaths.connexionRecruteur);
        } 
        if(token?.role===tables.admin){
          data = changeSousMenuPath(data, menuPaths.admin, menuPaths.connexionAdmin);
        } 
        content = [...content, data];
      })
      newState.content = content;
      state.title = newState?.title;
      state.content = content;
    }
  },
});

export const { changeSousMenu } = sousMenuSlice.actions;
export default sousMenuSlice.reducer;