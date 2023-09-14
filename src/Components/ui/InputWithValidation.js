import clsx from 'clsx'

const InputWithValidation = ({ register, className, errors, ...props }) => {
  const isError = errors[props.name]

  return (
    <>
      <input
        id={props.name}
        type={props.type !== undefined ? props.type : 'text'}
        className={clsx(className, isError ? 'border border-red-500' : '')}
        placeholder={props.placeholder}
        {...props}
        name={props.name}
        value={props.value}
        {...register(props.name)}
      />

      {isError && <label className="text-[#fe0001]">{isError.message}</label>}
    </>
  )
}

export default InputWithValidation
