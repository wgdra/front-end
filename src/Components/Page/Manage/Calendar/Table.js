import clsx from 'clsx'

export const Table = ({ totalTable, listSession, handleModal }) => {
  const classSession = () => {
    if (listSession.length === 1) {
      return 'w-full'
    }
    return `w-1/${listSession.length}`
  }

  return (
    <div className="flex">
      {totalTable?.map((item, index) => (
        <div key={index} className="flex flex-wrap w-[640px] h-64">
          {item.map((value, index) => (
            <div
              name="add-timeTable"
              key={index}
              className={clsx([
                classSession(),
                'h-full flex items-center justify-center border border-solid border-primary',
              ])}
              onClick={() => handleModal('add-timeTable')}
            >
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
