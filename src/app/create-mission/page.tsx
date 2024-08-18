'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/Button'
import useMissionStore from '@/stores/useMissionStore'
import Back from 'public/icons/back.svg'
import Refresh from 'public/icons/refresh.svg'

const missions = [
  '여기에서 제일 연장자 찾기',
  '여기에서 제일 막내 찾기',
  '옆 사람 어깨 주물러주기',
  '옆 사람에게 칭찬 해주기',
  '지금 기분을 춤으로 표현하기',
  '가장 좋아하는 음식 말하기',
  '최근에 본 영화 추천하기',
  '1분 동안 눈 안 깜빡이고 있기',
  '좋아하는 노래 한 소절 부르기',
  '짝꿍과 손잡고 1분 동안 있기',
]

function MissionCreationPage() {
  const { missionType, setMissionType } = useMissionStore()
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedMission, setSelectedMission] = useState<string | null>(null)
  const [visibleMissions, setVisibleMissions] = useState<string[]>([
    '?',
    '?',
    '?',
  ])

  const startSpinning = () => {
    setIsSpinning(true)
    setSelectedMission(null)
    let counter = 0
    const spinInterval = setInterval(() => {
      setVisibleMissions((prevMissions) => {
        const newMissions = [...prevMissions]
        newMissions.pop()
        newMissions.unshift(
          missions[Math.floor(Math.random() * missions.length)],
        )
        return newMissions
      })
      counter += 1
      if (counter >= 30) {
        clearInterval(spinInterval)
        setIsSpinning(false)
        const randomMission =
          missions[Math.floor(Math.random() * missions.length)]
        setSelectedMission(randomMission)
        setVisibleMissions([randomMission, '?', '?'])
      }
    }, 100)
  }

  const selectMission = (mission: string) => {
    setSelectedMission(mission)
  }

  const performMission = () => {
    setSelectedMission(null)
    setVisibleMissions(['?', '?', '?'])
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white p-4 flex items-center justify-between ">
        <Link href="/" className="text-2xl">
          <Image src={Back} alt="back" />
        </Link>
        <h1 className="text-[18px] font-bold">미션 추가하기</h1>
        <div className="w-6" />
      </header>

      <div className="flex justify-center mt-6 mb-4">
        <div className="relative bg-gray-200 rounded-full p-1 w-[220px]">
          <div
            className={`absolute top-[2px] ${
              missionType === 'select' ? 'left-[calc(50%+2px)]' : 'left-[2px]'
            } w-[calc(50%-4px)] h-[calc(100%-4px)] bg-white rounded-full transition-all duration-300 z-0`}
          />
          <div className="relative z-10 flex">
            <button
              onClick={() => {
                setMissionType('random')
                setSelectedMission(null)
              }}
              className={`w-1/2 py-2 rounded-full transition-all duration-300 ${
                missionType === 'random' ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              랜덤
            </button>
            <button
              onClick={() => {
                setMissionType('select')
                setSelectedMission(null)
              }}
              className={`w-1/2 py-2 rounded-full transition-all duration-300 ${
                missionType === 'select' ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              모임
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-4 bg-gray-300">
        {missionType === 'random' ? (
          <div className="w-64 h-64 mb-8 overflow-hidden">
            <div
              className={`flex flex-col items-center transition-transform duration-100 ease-linear ${isSpinning ? '-translate-y-1/3' : ''}`}
            >
              {visibleMissions.map((mission, index) => (
                <div
                  key={index}
                  className="w-full h-64 bg-white shadow-md rounded-lg flex items-center justify-center p-4 text-center mb-4"
                >
                  <p className="text-lg font-semibold">{mission}</p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="w-full max-w-md">
            {missions.map((mission, index) => (
              <button
                type="button"
                key={index}
                className={`w-full p-4 bg-white mb-2 rounded-lg cursor-pointer ${selectedMission === mission ? ' cursor-pointer bg-red-200' : ''}`}
                onClick={() => selectMission(mission)}
              >
                {mission}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-center space-x-4 p-4">
        {missionType === 'random' ? (
          <>
            <Button
              type="button"
              variant={selectedMission ? 'outline' : 'primary'}
              onClick={startSpinning}
              disabled={isSpinning}
              className={selectedMission ? 'w-20 px-7' : 'w-full text-white'}
            >
              {isSpinning ? (
                '미션 뽑는 중...'
              ) : selectedMission ? (
                <Image src={Refresh} alt="refresh" />
              ) : (
                '미션 뽑기'
              )}
            </Button>
            {selectedMission && (
              <Button
                type="button"
                variant="primary"
                onClick={performMission}
                className="w-full text-white"
              >
                미션 수행하기
              </Button>
            )}
          </>
        ) : (
          <button
            type="button"
            onClick={performMission}
            disabled={!selectedMission}
            className="px-6 py-2 bg-green-500 text-white rounded-full disabled:bg-gray-400"
          >
            미션 수행하기
          </button>
        )}
      </div>
    </div>
  )
}

export default MissionCreationPage
