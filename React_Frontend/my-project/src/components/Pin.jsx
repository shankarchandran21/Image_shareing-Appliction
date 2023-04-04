import React  from 'react'
import { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {v4 as uuidv4} from 'uuid'
import {MdDownloadForOffline} from 'react-icons/md'
import {AiTwotoneDelete} from 'react-icons/ai'
import {BsFillArrowUpRightCircleFill} from 'react-icons/bs' 
import { fetchUser } from '../utils/data'
import { client, urlFor } from '../client'

function Pin({pin:{postedBy, image, _id, destination ,save}}) {
  const [postHovered, setPostHovered] = useState(false)
  const [savingPost,setSavingPost] = useState(false)
  const navigate=useNavigate()
  const user=fetchUser()
  const alreadySave=!!(save?.filter((item)=>item?.postedBy?._id === user?.sub))?.length; 
  const desinationCheck = !!(destination?.match(/www./gi))?.length;
//1,[1,2,3] -> [1].length -> 1 -> !1 -> false -> !false -> true
//4,[1,2,3] -> [].length -> 0 -> !0 -> true -> !true -> false
const deletePin = (_id) => {

    client
      .delete(_id)
      .then(() => {
        window.location.reload();
      });
  };





const savePin = (id)=>{
  if(!alreadySave){
    setSavingPost(true)
    client
    .patch(id)
    .setIfMissing({save:[]})
    .insert('after','save[-1]',[{
      _key:uuidv4(),
      userId:user?.sub,
      postedBy:{
        _type:'postedBy',
        _ref:user?.sub,
      }
    }])
    .commit()
    .then(()=>{
      window.location.reload();
      setSavingPost(false)
      })

  }
}



  return (
    <div className='m-2'>
      <div onMouseOver={()=>setPostHovered(true)}
            onMouseLeave={()=>setPostHovered(false)}
            onClick={()=>navigate(`/pin-detail/${_id}`)}
            className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden'
      >
        <img className='rounded-lg w-full' src={urlFor(image).width(250).url()} alt="user-post" />
         {postHovered &&(
          <div className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
            style={{height:'100%'}}
          >
              <div className='flex items-center justify-between'>
                <div className='flex gap-2'>
                    <a href={`${image?.asset?.url}?dl=`}
                      download
                      onClick={(e)=>e.stopPropagation()}
                      className='bg-white w-9 h-6 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                    >
                      <MdDownloadForOffline/>
                    </a>
                </div>
                {alreadySave ?(
                  <button type='button' className='bg-sky-500/100 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none '>
                  {save?.length} Saved
                  </button>
                ):<button type='button' className='bg-sky-500/100 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outlined-none' onClick={(e)=>{
                  e.stopPropagation()
                  savePin(_id);
                }}>
                  Save
                </button>

                }
              </div>
              
              <div className='flex justify-between items-center gap-2 w-full'>
                  {desinationCheck ? (
                    <a
                  href={destination}
                  target="_blank"
                  className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-2 pr-2 rounded-full opacity-70 hover:opacity-100 hover:shadow-md"
                  rel="noreferrer"
                >
                  <BsFillArrowUpRightCircleFill />
                  {destination?.length>15?`${destination.slice(8,15)}...`:destination.slice(8)}
                </a>
                  ):null}
                  {postedBy?._id === user?.sub &&(
                    <button type='button' onClick={(e)=>{
                          e.stopPropagation()
                           deletePin(_id);
                }} className="bg-white p-2 rounded-full w-8 h-8 flex items-center justify-center text-dark opacity-75 hover:opacity-100 outline-none">
                     <AiTwotoneDelete />
                    </button> 
                  )}
              </div>
          </div>
         )}
      </div>
      <Link to={`user-profile/${postedBy?._id}`} className='flex gap-2 mt-2 items-center'>
                <img className='w-8 h-8 rounded-full object-cover' src={postedBy?.image} alt="user-profile" />
             <p className='font-semibold capitalized'>{postedBy?.userName}</p>
      </Link>
    </div>
  )
}

export default Pin