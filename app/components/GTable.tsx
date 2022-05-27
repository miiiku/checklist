import dayjs from "dayjs"
import { useEffect, useState } from "react"

interface DateMap {
  [key: string]: Array<string>
}

function add0(m: number) {
  return m < 10 ? "0" + m : m
}

export default function GTable() {
  const tableColumns = new Array(31).fill(0).map((_, i) => i + 1)
  const tableRows = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  const [tableData, setTableData] = useState({})

  const year = dayjs().year()
  const day = dayjs().format('YYYY-MM-DD')


  const checkData:DateMap = {
    '2022-05-24': ['task-a'],
    '2022-06-02': ['task-a', 'task-b'],
    '2022-06-05': ['task-a', 'task-b', 'task-c', 'task-d', 'task-e'],
    '2022-06-06': ['task-a', 'task-b', 'task-c'],
    '2022-06-08': ['task-a', 'task-b', 'task-c', 'task-d'],
    '2022-06-10': ['task-a', 'task-b'],
    '2022-06-13': ['task-a', 'task-b', 'task-c', 'task-d'],
    '2022-07-02': ['task-a', 'task-b', 'task-c'],
    '2022-07-04': ['task-a', 'task-b', 'task-c', 'task-d'],
    '2022-07-05': ['task-a'],
    '2022-07-06': ['task-a', 'task-b', 'task-c', 'task-d'],
    '2022-07-20': ['task-a', 'task-b'],
    '2022-07-21': ['task-a', 'task-b', 'task-c', 'task-d'],
  }


  useEffect(() => {
    initTableDate()
  }, [])


  function initTableDate () {
    const dayjsObj = dayjs().year(year)
    const dateObj: DateMap = {}
    for (let i = 0; i < 12; i++) {
      const month = dayjsObj.month(i).daysInMonth()
      for (let j = 1; j <= month; j++) {
        dateObj[`${year}-${add0(i + 1)}-${add0(j)}`] = []
      }
    }
    setTableData(dateObj)
  }

  /**
   * 渲染顶部天方块
   * @param key 
   * @returns 
   */
  function renderDayBlock (key: number) {
    return (
      <div className="date-item--wrap" key={key}>
        <div className="date-item--inner inner-day">{ key }</div>
      </div>
    )
  }

  /**
   * 渲染左侧月方块
   * @param key 
   * @returns 
   */
  function renderMonthBlock (key: string) {
    return (
      <div className="date-item--wrap" key={ key }>
        <div className="date-item--inner inner-month">{ key }</div>
      </div>
    )
  }

  /**
   * 渲染日期方块
   * @param key 
   * @returns 
   */
  function renderDateBlock (key: string) {
    // 无效日期
    if (!Reflect.has(tableData, key)) {
      return renderCustomBlock(key, '🍭')
    }

    const dateInfo = checkData[key] || []
    const isLive = key === day

    // 已完成日期
    if (dateInfo && dateInfo.length) {
      return (
        <div className="date-item--wrap" key={ key }>
          <div className={ `date-item--inner inner-date${isLive ? ' inner-live' : ''}` }>
            { dateInfo.map(item => <span key={item}></span>) }
          </div>
        </div>
      )
    }

    // 无数据日期
    return (
      <div className="date-item--wrap" key={ key }>
        <div className={ `date-item--inner inner-date${isLive ? ' inner-live' : ''}` }></div>
      </div>
    )
  }

  function renderCustomBlock (key: string, text: string) {
    return (
      <div className="date-item--wrap" key={key}>
        <div className="date-item--inner inner-custom">{ text }</div>
      </div>
    )
  }
  

  return (
    <div className="table-container mx-auto w-fit grid grid-cols-32 grid-rows-13 gap-2">
      { renderCustomBlock('/', '🎇') }
      { tableColumns.map(day => renderDayBlock(day)) }
      {
        tableRows.map((month, index) => {
          const row = []
          row.push(renderMonthBlock(month))
          tableColumns.forEach(day => {
            const key = `${year}-${add0(index + 1)}-${add0(day)}`
            row.push(renderDateBlock(key))
          })
          return row
        })
      }
    </div>
  )
}