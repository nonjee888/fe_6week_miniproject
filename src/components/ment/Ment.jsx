import { useState } from "react";
import { useDispatch } from "react-redux/";
import Commentmodal from "../commentmodal/Commentmodal";
import { removeComment } from "../../redux/modules/comments";

const Ment = ({ment}) => {
    let dispatch = useDispatch();
    let [modal, setModal] = useState(false);
    const close=()=>{
        setModal(false);
      }
      
    return (
    <>
        {modal?<Commentmodal ment = {ment} close={close}/>:null}
        <div className='list' 
        // key={ment.id}
        >
            <h4>
                {/* {ment.desc} */}
                </h4>
            <button onClick={()=>{
            setModal(true);
            }}>수정하기</button>
            <button onClick={()=>{
              dispatch(removeComment(ment.id))
            }}>
            삭제하기</button>
        </div>
    </>
    )
}

export default Ment;