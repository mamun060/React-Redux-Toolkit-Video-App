import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReletedVideos } from "../../features/relatedVideos/relatedVideosSlice";
import Loading from "../ui/Loading";
import RelatedVideoListItem from "./RelatedVideoListItem";

export default function RelatedVideoList({currentVideoId, tags}) {
    const dispatch = useDispatch();

    const {relatedVideos, isLoading, isError, error} = useSelector((state)=> state.relatedVidoes)

    useEffect(()=>{
        dispatch(fetchReletedVideos({tags, id: currentVideoId}))
    },[dispatch, tags, currentVideoId])

    // let write logic for load component
    let content;

    if(isLoading) content = <Loading />

     
    if(!isLoading && isError) 
    content =  <div className="col-span-12">{error}</div>;

    if(!isLoading && !isError && relatedVideos?.length === 0){
        <div className="col-span-12">NO Video Found!</div>
    }

    if(!isLoading && !isError && relatedVideos?.length > 0){
        content = relatedVideos.map((video)=>(
            <RelatedVideoListItem key={video.id} video={video} />
        ))
    }

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
           {content}
        </div>
    );
}
