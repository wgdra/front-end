import clsx from 'clsx'

const Header = ({ listRoom, listSession }) => {
  const classSession = () => {
    if (listSession.length === 1) {
      return 'w-full'
    }

    return `w-1/${listSession.length}`
  }
  return (
    <>
      <div className="flex text-base font-semibold w-full">
        {listRoom?.map((item) => {
          return (
            <div key={item?.id} className="w-[640px] h-32">
              <div className="flex items-center justify-center border border-solid border-primary h-1/2">
                {item?.classroom_name}
              </div>
              <div className="flex items-center h-1/2">
                {listSession?.map((item) => {
                  return (
                    <div
                      key={item.id}
                      className={clsx([
                        classSession(),
                        'h-full flex items-center justify-center border border-solid border-primary',
                      ])}
                    >
                      {item.session_name}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
export default Header
