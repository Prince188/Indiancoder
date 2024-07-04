import { useState } from "react"

export const usePagination = (perPageRecord, totalPageRecord) => {
    const totalPages = Math.ceil(totalPageRecord / perPageRecord)

    const [startPageIndex, setStartPageIndex] = useState(0)
    const [endPageIndex, setEndPageIndex] = useState(perPageRecord - 1)
    const [currentPageIndex, setCurrentPageIndex] = useState(1)

    // function

    const displayPages = (pageNo) => {
        setCurrentPageIndex(pageNo)
        let last_record_index = (perPageRecord * pageNo) - 1 //6 * 2 - 1 = 11 , 5 * 2 -1 = 9
        let first_record_index = (perPageRecord * pageNo) - perPageRecord // 6 * 2 - 6 , 5 * 2 - 5 = 5
        setStartPageIndex(first_record_index)
        if (last_record_index > totalPageRecord) { // totalPageRecord = 8
            setEndPageIndex(totalPageRecord - 1)   // last_record_index = 9
        } else {
            setEndPageIndex(last_record_index)
        }
    }

    return [
        totalPages, startPageIndex, endPageIndex, currentPageIndex, displayPages
    ]
}