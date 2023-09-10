import clsx from 'clsx'

const SelectWithValidation = ({
  register,
  className,
  errors,
  options,
  name,
  Svg,
  onChange,
  ...props
}) => {
  const isError = errors[props.name]

  return (
    <>
      <select
        id={props.name}
        className={clsx(className, isError ? 'border border-red-500' : '')}
        name={props.name}
        onChange={props.onChange}
        {...props}
        {...register(props.name)}
      >
        {options && options.map((option) => <option id={option.id}>{option.name}</option>)}
      </select>
      {isError && <label className="text-[#fe0001]">{isError.message}</label>}
    </>
  )
}

export default SelectWithValidation
