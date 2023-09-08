const Day = ({ dataDay }) => {
  return (
    <>
      <div className="mt-32 w-48">
        {dataDay.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-center text-base h-64 font-semibold border border-solid border-primary"
          >
            {item}
          </div>
        ))}
      </div>
    </>
  )
}
export default Day
