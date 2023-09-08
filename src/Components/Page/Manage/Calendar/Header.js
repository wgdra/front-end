const Header = ({ dataRoom, dataSession }) => {
  return (
    <>
      <div className="flex text-base font-semibold w-full">
        {dataRoom.map((item) => {
          return (
            <div key={item} className="w-[640px] h-32">
              <div className="flex items-center justify-center border border-solid border-primary h-1/2">
                {item}
              </div>
              <div className="flex items-center h-1/2">
                {dataSession.map((item) => {
                  return (
                    <div
                      key={item}
                      className="w-1/3 h-full flex items-center justify-center border border-solid border-primary"
                    >
                      {item}
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
