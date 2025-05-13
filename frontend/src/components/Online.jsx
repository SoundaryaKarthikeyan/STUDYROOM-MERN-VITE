import React from 'react'
import '../styles/online.css'
function Online({bool}) {
  return (<div className="OnlineFriends">
    <div className="chatOnlineFriend">
      <div className="chatOnlineImg">
      <img className="OnlineFriendImg" src="https://images.unsplash.com/photo-1741732311554-911ecc8da478?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D" alt="" />
      <div className={true? "chatOnlineBadge" : "OfflineBadge"}> </div>
      <span className="chatonlineName">John Doe</span>


      </div>
    </div>
     <div className="chatOnlineFriend">
     <div className="chatOnlineImg">
     <img className="OnlineFriendImg" src="https://images.unsplash.com/photo-1741732311554-911ecc8da478?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D" alt="" />
     <div className={true? "chatOnlineBadge" : "OfflineBadge"}> </div>
     <span className="chatonlineName">John Doe</span>


     </div>
   </div>
    <div className="chatOnlineFriend">
    <div className="chatOnlineImg">
    <img className="OnlineFriendImg" src="https://images.unsplash.com/photo-1741732311554-911ecc8da478?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D" alt="" />
    <div className={true? "chatOnlineBadge" : "OfflineBadge"}> </div>
    <span className="chatonlineName">John Doe</span>


    </div>
  </div>
   <div className="chatOnlineFriend">
   <div className="chatOnlineImg">
   <img className="OnlineFriendImg" src="https://images.unsplash.com/photo-1741732311554-911ecc8da478?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxMHx8fGVufDB8fHx8fA%3D%3D" alt="" />
   <div className={true? "chatOnlineBadge" : "OfflineBadge"}> </div>
   <span className="chatonlineName">John Doe</span>


   </div>
 </div>
 </div>
  )
}

export default Online;