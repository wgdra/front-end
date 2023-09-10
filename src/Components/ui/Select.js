const Select = ({ register, className, errors, options, name, isMustChoose = false, ...props }) => {
  return (
    <select
      id={name}
      className={className}
      onChange={props.onChange}
      {...props}
      {...register(name)}
    >
      {options?.map((option) => {
        return (
          <>
            {!isMustChoose && (
              <option value="" hidden>
                Lựa chọn môn (không bắt buộc)
              </option>
            )}
            <option
              key={option.value}
              defaultValue={isMustChoose && option.value === options[1].value}
              value={option.value}
            >
              {option.label}
            </option>
          </>
        )
      })}
    </select>
  )
}

export default Select
