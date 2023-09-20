import clsx from 'clsx'

export const Table = ({ totalTable, listSession, handleModal }) => {
  const classSession = () => {
    if (listSession.length === 1) {
      return 'w-full'
    }
    return `w-1/${listSession.length}`
  }

  const itemLeng = [1, 2, 3, 4, 5, 6, 7]
  return (
    <div className="flex flex-wrap">
      {totalTable?.map((item, index) => (
        <div key={index} className="w-[640px] h-64">
          <div
            name="add-timeTable"
            key={index}
            className={clsx([
              classSession(),
              'h-full flex items-center justify-center border border-solid border-primary',
            ])}
            onClick={() => handleModal('add-timeTable')}
          >
            {item}
          </div>
        </div>
      ))}
    </div>
  )
}
