import { create } from 'zustand'

interface MissionState {
  missionId: number | null
  missionType: 'random' | 'select' | null
  currentMission: string | null
}

interface MissionActions {
  setMissionId: (id: number | null) => void
  setMissionType: (type: 'random' | 'select' | null) => void
  setCurrentMission: (mission: string | null) => void
}

interface MissionStore extends MissionState, MissionActions {}

const useMissionStore = create<MissionStore>((set) => ({
  missionId: null,
  setMissionId: (id) => set({ missionId: id }),
  missionType: null,
  setMissionType: (type) => set({ missionType: type }),
  currentMission: null,
  setCurrentMission: (mission) => set({ currentMission: mission }),
}))

export default useMissionStore
