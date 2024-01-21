import { faCopy, faEye } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { getTextColor } from './utils/lightColorDetector'
import { setLivePreviewState, setAssets } from '../redux/features/livePreview'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store'

export interface GradientProps {
    from: string
    to: string
    angle: number
}

export interface SingleColorProps {
    color: string
}

export const Gradient = ({ from, to, angle }: GradientProps) => {
    const livePreviewState = useSelector((state: RootState) => state.livePreview.livePreviewState);
    useEffect(() => {
        console.log(from, to, angle)
    }, [from, to, angle])
    const dispatch = useDispatch();
    const [isClicked, setIsClicked] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(
            `background: "linear-gradient(${angle}deg, ${from}, ${to})`
        )
        setIsClicked(true)

        setTimeout(() => {
            setIsClicked(false)
        }, 1000)
    }

    const handleLivePreviewActivation = () => {

        dispatch(setAssets({ from: from, to: to, angle }))
    }

    return (
        <div
            className='rounded-t-lg cursor-pointer relative border gradient-box '
            style={{
                backgroundImage: `linear-gradient(${angle}deg, ${from}, ${to})`,
                border: isClicked ? '2px solid #4299e1' : 'none'
            }}
        >
            <div className='absolute  flex-col  w-full h-full transition-opacity duration-300  opacity-0 hover:opacity-100 hover:border-white hover:border-2 top-0 left-0 right-0 bottom-0 flex items-center justify-center '>
                <div onClick={handleCopy} className='p-3 rounded-lg items-center flex  justify-center hover:border-white hover:border-2 transition ease-in-out delay-0  hover:-translate-y-1 hover:scale-110  duration-300'>
                    <FontAwesomeIcon icon={faCopy} fontSize={24} color='white' />
                    <span
                        className='mx-3 text-white'
                        style={{ color: getTextColor(from.toString()) }}
                    >
                        <p className='text-white'>CSS</p>
                    </span>{' '}
                </div>
                <div onClick={handleLivePreviewActivation} className='p-3 rounded-lg items-center flex  justify-center hover:border-white hover:border-2 transition ease-in-out delay-0  hover:-translate-y-1 hover:scale-110  duration-300'>
                    <FontAwesomeIcon icon={faEye} fontSize={24} color='white' />
                    <span
                        className='mx-3  '
                        style={{ color: getTextColor(from.toString()) }}
                    >
                        <p className='text-white'>Live Preview</p>
                    </span>{' '}
                </div>
            </div>

        </div>
    )
}

export const SingleColorView = ({ color }: SingleColorProps) => {
    const [isClicked, setIsClicked] = useState(false)
    const handleCopy = () => {
        navigator.clipboard.writeText(color)
        setIsClicked(true)

        setTimeout(() => {
            setIsClicked(false)
        }, 1000)
    }

    return (
        <div
            className='cursor-pointer relative border'
            style={{
                backgroundColor: color,
                border: isClicked ? '2px solid #4299e1' : 'none'
            }}
            onClick={handleCopy}
        >
            <div className='absolute w-full h-full transition-opacity duration-300 opacity-0 hover:opacity-100 top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
                <FontAwesomeIcon icon={faCopy} fontSize={30} color='white' />
                <span
                    className='mx-3'
                    style={{ color: getTextColor(color.toString()) }}
                >
                    {color}
                </span>{' '}
            </div>
        </div>
    )
}
