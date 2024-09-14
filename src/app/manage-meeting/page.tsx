'use client'

import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { z } from 'zod'
import { useModifyMeeting } from '@/apis/queries/meetingQueries'
import { Button } from '@/components/Button'
import ColorPicker from '@/components/ColorPicker'
import { TextInput } from '@/components/Inputs/TextInput'
import { TextareaInput } from '@/components/Inputs/TextareaInput'
import Popup from '@/components/Popup'
import COLORS from '@/constant/color'
import useMeetingStore from '@/stores/useMeetingStore'
import Back from 'public/icons/back.svg'

type ColorType = (typeof COLORS)[number]

const meetingSchema = z.object({
  meetingName: z
    .string()
    .min(1, '모임 이름을 입력해주세요')
    .max(20, '최대 20자까지 입력이 가능해요'),
  meetingDescription: z
    .string()
    .nonempty('모임 소개을 입력해주세요')
    .max(150, '최대 150자까지 입력이 가능해요'),
  meetingSymbolColor: z.enum(COLORS),
})

type MeetingFormData = z.infer<typeof meetingSchema>

function ManageMeeting() {
  const router = useRouter()
  const { meetingData, setMeetingUpdated } = useMeetingStore()

  const defaultSymbolColor: ColorType = COLORS.includes(
    meetingData?.symbolColor as ColorType,
  )
    ? (meetingData?.symbolColor as ColorType)
    : COLORS[0]

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    setValue,
  } = useForm<z.infer<typeof meetingSchema>>({
    defaultValues: {
      meetingName: meetingData?.name,
      meetingDescription: meetingData?.description,
      meetingSymbolColor: defaultSymbolColor,
    },
    resolver: zodResolver(meetingSchema),
    mode: 'onChange',
  })

  const [apiErrorMessage, setApiErrorMessage] = useState<string | null>(null)
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  const modifyMeeting = useModifyMeeting({
    onSuccess: () => {
      setMeetingUpdated(true)
      router.back()
    },
    onError: (error) => {
      if (error.error?.message) {
        setApiErrorMessage(error.error.message)
      } else {
        setApiErrorMessage(
          '모임 정보 수정 중 오류가 발생했습니다. 다시 시도해주세요.',
        )
      }
      console.log(apiErrorMessage)
    },
  })

  const onSubmit = (data: MeetingFormData) => {
    modifyMeeting.mutate({
      meetingId: meetingData?.meetingId ?? 0,
      name: data.meetingName,
      description: data.meetingDescription,
      symbolColor: data.meetingSymbolColor,
    })
  }

  const handleBack = () => {
    if (isDirty) {
      setIsPopupOpen(true)
    } else {
      router.back()
    }
  }

  return (
    <div className="flex flex-col min-h-screen w-full p-4">
      <div className="flex items-center justify-center relative h-[50px]">
        <div className="absolute left-0">
          <Image src={Back} alt="back" onClick={handleBack} />
        </div>
        <div className="text-center text-body1-bold text-gray-900">
          모임 정보
        </div>
      </div>
      <div className="text-gray-900 font-bold text-[22px] mt-9">
        모임 정보를 수정할 수 있어요
      </div>
      <div className="text-gray-700 font-normal text-sm mt-2 mb-8">
        변경한 모임 정보는 모든 참여원에게 반영돼요
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-grow"
      >
        <TextInput
          name="meetingName"
          label="모임 이름"
          control={control}
          placeholder="모임 이름 입력"
          error={errors.meetingName?.message}
          maxLength={20}
          showCharCount
        />

        <TextareaInput
          name="meetingDescription"
          label="모임 소개"
          control={control}
          placeholder="모임 소개 입력"
          error={errors.meetingDescription?.message}
          maxLength={150}
          showCharCount
        />

        <Controller
          name="meetingSymbolColor"
          control={control}
          render={({ field }) => (
            <ColorPicker
              label="모임 테마"
              onColorSelect={(color: ColorType) => {
                field.onChange(color)
                setValue('meetingSymbolColor', color, { shouldDirty: true })
              }}
              selectedColor={field.value}
            />
          )}
        />

        <div className="flex-grow" />

        <Button
          type="submit"
          variant="primary"
          className="mt-auto mb-5 w-full text-white"
          disabled={!isDirty || Object.keys(errors).length > 0}
        >
          변경사항 저장하기
        </Button>
      </form>
      <Popup
        isOpen={isPopupOpen}
        onCancel={() => setIsPopupOpen(false)}
        onConfirm={() => router.back()}
        title={
          <span>
            지금 나가면
            <br />
            변경된 정보가 모두 사라져요 :(
          </span>
        }
      />
    </div>
  )
}

export default ManageMeeting
