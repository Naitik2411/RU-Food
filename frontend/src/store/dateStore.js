import { create } from 'zustand'

const selectDate = create((set) => ({
    selectedDate: new Date(),
    setSelectedDate: (date) => {
        console.log("New selectedDate:", date);
        set({ selectedDate: date })},
}))

export default selectDate;