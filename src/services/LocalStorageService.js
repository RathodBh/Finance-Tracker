import { NAME } from "../utils/Constants";

export const getData = () => {
  if (localStorage.getItem(NAME)) {
    return JSON.parse(localStorage.getItem(NAME));
  } 
  return null;
};

export const setData = (data) => {
  const oldData = getData();
  if (!!oldData)
    localStorage.setItem(NAME, JSON.stringify([data, ...oldData]));
  else localStorage.setItem(NAME, JSON.stringify([data]));
};

export const deleteData = (id,arr,setMyArr) => {
    const oldData = [...arr];
    const newData = oldData.filter(data => data.id !== parseInt(id))
    console.log("🚀 ~ file: LocalStorageService.js:20 ~ deleteData ~ newData:", newData)
    localStorage.setItem(NAME, JSON.stringify([...newData]))
    setMyArr(newData)
}