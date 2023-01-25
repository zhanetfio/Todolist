import {AppRootStateType} from "./store";

export const selectStatus = (state:AppRootStateType)=> state.app.status;
export const selectIsInitialized =(state:AppRootStateType)=>state.app.isInitialize;
export const selectError = (state: AppRootStateType) => state.app.error