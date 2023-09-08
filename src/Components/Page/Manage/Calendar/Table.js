import clsx from 'clsx'

export const Table = ({ dataTable }) => {
  console.log(dataTable)
  return (
    <div className="flex">
      {dataTable.map((item, index) => (
        <div key={item} className="flex w-[640px] h-64">
          {item.map((value, index) => (
            <div
              key={value + index}
              className="w-1/3 h-full flex items-center justify-center border border-solid border-primary"
              onClick={() => {
                console.log('ahha')
              }}
            >
              {value}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}
