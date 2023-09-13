import instance from "./instance";

export const getComment=data=>instance({url:'/get',method:'post',data})

export const addComment=data=>instance({url:'/add',method:'post',data})
