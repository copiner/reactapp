
import React, { useState } from "react";
export const useModalVisible = () =>{
  
  const [visible, setVisible] = useState(false);
  const hideModal = ()=>setVisible(false);
  const openModal = ()=>setVisible(true)

  return {
    visible,
    hideModal,
    openModal
  }
}
