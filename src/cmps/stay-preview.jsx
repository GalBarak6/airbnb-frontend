import { Link } from 'react-router-dom'
import { DemoCarousel } from './carousel'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { updateWishlist } from '../store/actions/user.actions';

export const StayPreview = ({ stay }) => {

    const { user } = useSelector((storeState) => storeState.userModule)
    const [isLike, setIsLike] = useState(false)
    const dispatch = useDispatch()

    const onToggleLike = async () => {
        if (!user) return
        // const type = (isLike) ? 'splice' : 'unshift'
        await dispatch(updateWishlist(user, stay, !isLike))
        setIsLike(!isLike)
    }

    return <section className="stay-preview">

        <div className="img-container">
            <DemoCarousel imgs={stay.imgUrls} />
            {isLike && <svg onClick={onToggleLike} viewBox="0 0 32 32" className="icon-heart" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: '#FF385C', height: '24px', width: '24px', stroke: '#ffffff', strokeWidth: '2', overflow: 'visible' }}><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path></svg>}
            {!isLike && <svg onClick={onToggleLike} viewBox="0 0 32 32" className="icon-heart" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="presentation" focusable="false" style={{ display: 'block', fill: 'rgba(0,0,0,0.5)', height: '24px', width: '24px', stroke: '#ffffff', strokeWidth: '2', overflow: 'visible' }}><path d="m16 28c7-4.733 14-10 14-17 0-1.792-.683-3.583-2.05-4.95-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05l-2.051 2.051-2.05-2.051c-1.367-1.366-3.158-2.05-4.95-2.05-1.791 0-3.583.684-4.949 2.05-1.367 1.367-2.051 3.158-2.051 4.95 0 7 7 12.267 14 17z"></path></svg>}

        </div>
        <Link to={`/stay/${stay._id}`}>
            <div className="txt-container">
                <div className="flex space-between align-center">
                    <div className="bold">{stay.loc.city}<span>, {stay.loc.country}</span></div>
                    <div className="flex align-center gap">
                        <span className='rate'>{stay.reviewScores.rating.toFixed(1)} </span>
                        <img className="icon" src={require('../assets/icons/star.svg').default} alt="" />
                    </div>
                </div>
                <div>{stay.name}</div>
                <div>{stay.type}</div>
                <div className="bold">${stay.price.toLocaleString()} <span className="night"> night</span> </div>

            </div>
        </Link>
    </section>
}