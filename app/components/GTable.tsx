import dayjs from "dayjs"
import { useEffect, useState } from "react"

enum BLOCK_TYPE {
  MONTH   = 'month',
  DAY     = 'day',
  DATE    = 'date',
  ONLY    = 'only',
  INVALID = 'invalid',
}

interface DateMap {
  [key: string]: Array<string>
}

interface RenderProps {
  key: string | number,
  type: BLOCK_TYPE,
  isLive?: boolean,
  render?: (props: any) => JSX.Element | Array<JSX.Element> | string | number,
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
    '2022-06-05': ['task-a', 'task-b'],
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
   * 渲染日期方块
   * @param key 
   * @returns 
   */
  function renderDateBlock (key: string) {
    // 无效日期
    if (!Reflect.has(tableData, key)) {
      return renderBlock({ key, type: BLOCK_TYPE.INVALID, render: () => '👻' })
    }

    const dateInfo = checkData[key] || []
    const isLive = key === day

    // 已完成日期
    if (dateInfo && dateInfo.length) {
      return renderBlock({
        key,
        type: BLOCK_TYPE.DATE,
        isLive,
        render: () => dateInfo.map(item => <span key={item}></span>)
      })
    }

    // 无数据日期
    return renderBlock({ key, type: BLOCK_TYPE.ONLY, isLive })
  }

  /**
   * 渲染方块
   * @param props 
   * @returns 
   */
  function renderBlock (props: RenderProps) {
    return (
      <div className="date-item--wrap" key={props.key}>
        <div className={ `date-item--inner inner-${props.type}${ props.isLive ? ' live' : '' }` }>
          { props.render && props.render(props) }     
        </div>
      </div>
    )
  }
  

  return (
    <div className="table-container mx-auto w-fit grid grid-cols-32 grid-rows-13 gap-2">
      { renderBlock({ key: '/', type: BLOCK_TYPE.ONLY, render: () => '🌟' }) }
      { tableColumns.map(day => renderBlock({ key: day, type: BLOCK_TYPE.DAY, render: () => day })) }
      {
        tableRows.map((month, index) => {
          const row = []
          row.push(renderBlock({ key: month, type: BLOCK_TYPE.MONTH, render: () => month }))
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