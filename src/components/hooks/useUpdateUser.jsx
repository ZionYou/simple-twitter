import {useState} from "react"
import {patchUserInfo} from 'api/userInfo'

const useUpdateUser = () => {
  const [isUpdating, setIsUpdating] = useState()
  const updateUserInfo = async({name, avatar, cover, introduction}, id) => {
    try {
      if(isUpdating) return
      setIsUpdating(true)

      const postStatus = await patchUserInfo(
        {name, avatar, cover, introduction}, id
      )
      setIsUpdating(false)
    } catch (error) {
      console.error(error)
      setIsUpdating(false)
    }
  }

  return {
    isUpdating, updateUserInfo
  }
}

export default useUpdateUser