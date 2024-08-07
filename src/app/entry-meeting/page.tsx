'use client'

import { useState } from 'react'
import { MeetingInfo, NicknameInput, PasswordInput } from './_components'

function EntryMeeting() {
  const [page, setPage] = useState('info')

  const renderPage = () => {
    switch (page) {
      case 'info':
        return <MeetingInfo onEnterClick={() => setPage('password')} />
      case 'password':
        return <PasswordInput onPasswordSubmit={() => setPage('nickname')} />
      case 'nickname':
        return (
          <NicknameInput
            onNicknameSubmit={() => console.log('닉네임 제출 완료. 모임 입장')}
          />
        )
      default:
        return <MeetingInfo onEnterClick={() => setPage('password')} />
    }
  }

  return <div className="flex flex-col items-center">{renderPage()}</div>
}

export default EntryMeeting
