'use client'

import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import AuthGuard from '@/app/AuthGuard'
import Loading from '@/components/Loading'
import { ToastContainer } from '@/components/Toast'
import { IMAGE_BASE_URL } from '@/constant/base_url'
import useMeetingStore from '@/stores/useMeetingStore'
import useToastStore from '@/stores/useToastStore'
import { ApiError } from '@/types/api'
import { CheckMeetResponse } from '@/types/meeting'
import Back from 'public/icons/back.svg'
import Logo from 'public/logo.svg'
import { getMeetingById } from '../../../apis/meetingApi'
import MeetingDetail from './_components/MeetingDetail'
import MeetingRaising from './_components/MeetingRaising'

function MeetingInfo() {
  const router = useRouter()
  const [isMenuDetail, setIsMenuDetail] = useState(true)
  const { meetingData, setMeetingData } = useMeetingStore()
  const { message, showToast } = useToastStore()

  const { isLoading, error } = useQuery<CheckMeetResponse, ApiError>({
    queryKey: ['meeting', meetingData?.meetingId],
    queryFn: async () => {
      const response = await getMeetingById(meetingData?.meetingId ?? 0)
      setMeetingData(response.data)
      return response
    },
    enabled: !!meetingData?.meetingId,
    retry: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (message) {
      showToast()
    }
  }, [message, showToast])

  if (isLoading) {
    return <Loading />
  }

  if (error) {
    return <div>Error: {error.error?.message}</div>
  }

  return (
    <AuthGuard>
      <div className="flex flex-col h-screen w-full">
        <div className="flex-none">
          <div className="p-4">
            <div className="flex items-center justify-center relative h-[50px]">
              <div className="absolute left-0">
                <button onClick={() => router.push('/meeting-home')}>
                  <Image src={Back} alt="back" />
                </button>
              </div>
              <div className="text-center">모임 정보</div>
            </div>
            <div className="flex justify-between pt-3 pb-5">
              <div className="flex flex-col">
                <div className="flex justify-start">
                  <div
                    className="text-white text-caption-medium px-[10px] py-1 rounded-lg "
                    style={{
                      backgroundColor: meetingData?.symbolColor,
                    }}
                  >
                    모임 진행 중
                  </div>
                </div>

                <div className=" font-bold text-[22px] mt-3">
                  {meetingData?.name}
                </div>
              </div>

              <div className="relative w-[75px] h-[75px] rounded-full overflow-hidden">
                {meetingData?.thumbnailUrl ? (
                  <Image
                    loader={({ src }) => src}
                    src={`${IMAGE_BASE_URL}/${meetingData?.thumbnailUrl}`}
                    alt="thumbnail"
                    layout="fill"
                    objectFit="cover"
                    unoptimized
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: meetingData?.symbolColor }}
                  >
                    <Image
                      src={Logo}
                      alt="thumbnail"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex ">
            <button
              onClick={() => setIsMenuDetail(true)}
              className={`text-gray-600 border-b-[1px] text-body1-semibold w-1/2 flex justify-center py-3 ${
                isMenuDetail ? 'border-b-2' : ''
              }`}
              style={{
                color: isMenuDetail ? meetingData?.symbolColor : '',
                borderColor: isMenuDetail ? meetingData?.symbolColor : '',
              }}
            >
              모임 상세
            </button>
            <button
              onClick={() => setIsMenuDetail(false)}
              className={`text-gray-600 border-b-[1px] text-body1-semibold w-1/2 flex justify-center py-3 ${
                !isMenuDetail ? 'border-b-2' : ''
              }`}
              style={{
                color: !isMenuDetail ? meetingData?.symbolColor : '',
                borderColor: !isMenuDetail ? meetingData?.symbolColor : '',
              }}
            >
              모임 키우기
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto">
          {isMenuDetail ? <MeetingDetail /> : <MeetingRaising />}
        </div>
        <ToastContainer />
      </div>
    </AuthGuard>
  )
}

export default MeetingInfo
